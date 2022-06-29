const mockItems = [
  {
    id: "iisDsxz4GhSzcHsRoPty2",
    title: "czapka",
    amount: 100,
    category: "prezenty",
    date: "2021-12-20T00:00:00.000Z",
  },
  {
    id: "U3QYrR1iOLwY2-mJE722S",
    title: "czekoladki",
    amount: 50,
    category: "prezenty",
    date: "2022-02-14T00:00:00.000Z",
  },
  {
    id: "6dEbNpul09xKvGMhF5F6b",
    title: "biedronka",
    amount: 200,
    category: "jedzenie",
    date: "2022-06-10T00:00:00.000Z",
  },
  {
    id: "QPoCwW7cvYzsEApdVIhVo",
    title: "lidl",
    amount: 90,
    category: "jedzenie",
    date: "2022-06-20T00:00:00.000Z",
  },
  {
    id: "0B_Xu4ZwLd2Fow14aTvns",
    title: "bilet 30-dniowy",
    amount: 110,
    category: "transport",
    date: "2022-05-30T00:00:00.000Z",
  },
  {
    id: "mFdbKmKNuXTCg4nnOtFwy",
    title: "taxi",
    amount: 35,
    category: "transport",
    date: "2022-06-16T00:00:00.000Z",
  },
  {
    id: "OH-HiLgk4glV41m_ryN2q",
    title: "wycieczka nad morze",
    amount: 4000,
    category: "wakacje",
    date: "2021-07-01T00:00:00.000Z",
  },
  {
    id: "b47Lu6NiLvtwPohEXQGsD",
    title: "weekend w Zakopanem",
    amount: 2000,
    category: "wakacje",
    date: "2022-01-12T00:00:00.000Z",
  },
];

const expectedAllGrouped = [
  {
    name: "prezenty",
    items: [
      {
        id: "iisDsxz4GhSzcHsRoPty2",
        title: "czapka",
        amount: 100,
        category: "prezenty",
        date: "2021-12-20T00:00:00.000Z",
      },
      {
        id: "U3QYrR1iOLwY2-mJE722S",
        title: "czekoladki",
        amount: 50,
        category: "prezenty",
        date: "2022-02-14T00:00:00.000Z",
      },
    ],
    totalAmount: 150,
  },
  {
    name: "jedzenie",
    items: [
      {
        id: "6dEbNpul09xKvGMhF5F6b",
        title: "biedronka",
        amount: 200,
        category: "jedzenie",
        date: "2022-06-10T00:00:00.000Z",
      },
      {
        id: "QPoCwW7cvYzsEApdVIhVo",
        title: "lidl",
        amount: 90,
        category: "jedzenie",
        date: "2022-06-20T00:00:00.000Z",
      },
    ],
    totalAmount: 290,
  },
  {
    name: "transport",
    items: [
      {
        id: "0B_Xu4ZwLd2Fow14aTvns",
        title: "bilet 30-dniowy",
        amount: 110,
        category: "transport",
        date: "2022-05-30T00:00:00.000Z",
      },
      {
        id: "mFdbKmKNuXTCg4nnOtFwy",
        title: "taxi",
        amount: 35,
        category: "transport",
        date: "2022-06-16T00:00:00.000Z",
      },
    ],
    totalAmount: 145,
  },
  {
    name: "wakacje",
    items: [
      {
        id: "OH-HiLgk4glV41m_ryN2q",
        title: "wycieczka nad morze",
        amount: 4000,
        category: "wakacje",
        date: "2021-07-01T00:00:00.000Z",
      },
      {
        id: "b47Lu6NiLvtwPohEXQGsD",
        title: "weekend w Zakopanem",
        amount: 2000,
        category: "wakacje",
        date: "2022-01-12T00:00:00.000Z",
      },
    ],
    totalAmount: 6000,
  },
];

module.exports = {
  mockItems,
  expectedAllGrouped,
};
