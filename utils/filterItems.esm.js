const validatorMap = {
  startDate: (startDate) => (item) =>
    new Date(item.date).getTime() > startDate.getTime(),
  endDate: (endDate) => (item) =>
    new Date(item.date).getTime() < endDate.getTime(),
};

const groupByMap = {
  category: {
    key: "category",
    getInitialData: (name) => ({
      name,
      items: [],
      count: 0,
      totalAmount: 0,
      averageAmount: null,
    }),
    reducer: ({ name, items, count, totalAmount }, item) => {
      totalAmount = totalAmount + item.amount;
      count = count + 1;
      const averageAmount = totalAmount / count;
      return {
        name,
        items: items.concat(item),
        count,
        totalAmount,
        averageAmount,
      };
    },
  },
};

export const filterItems = (items, query = {}) => {
  const { where, groupBy } = query;

  if (where) {
    const basicKeys = Object.keys(where).filter(
      (key) => where[key] && !validatorMap[key]
    );
    const specialKeys = Object.keys(where).filter(
      (key) => where[key] && validatorMap[key]
    );
    items = items
      .filter((item) => basicKeys.every((key) => item[key] === where[key]))
      .filter((item) =>
        specialKeys.every((key) => {
          const checkFn = validatorMap[key];
          return checkFn(where[key])(item);
        })
      );
  }

  if (groupBy && groupByMap[groupBy]) {
    const { key: groupByKey, getInitialData, reducer } = groupByMap[groupBy];
    const groupKeys = [...new Set(items.map((item) => item[groupByKey]))];
    return groupKeys.map((key) =>
      items
        .filter((item) => item[groupByKey] === key)
        .reduce(reducer, getInitialData(key))
    );
  }

  return items;
};
