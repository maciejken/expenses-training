const { filterItems } = require("./filterItems.esm.js");
const {
  mockItems,
  expectedAllGrouped,
  expectedFilteredGrouped,
} = require("./mocks");

describe("filterItems", () => {
  it("returns all items if no query is specified", () => {
    const filteredItems = filterItems(mockItems);
    expect(filteredItems.length).toBe(mockItems.length);
  });

  it("returns items filtered by category", () => {
    const category = "prezenty";
    const query = { where: { category } };
    const filteredItems = filterItems(mockItems, query);
    expect(filteredItems.every((item) => item.category === category)).toBe(
      true
    );
  });

  it("returns items filtered by date", () => {
    const query = {
      where: {
        startDate: new Date("2022-01-01"),
        endDate: new Date("2023-01-01"),
      },
    };
    const filteredItems = filterItems(mockItems, query);
    filteredItems.forEach((item) => {
      const year = new Date(item.date).getFullYear();
      expect(year).toBe(2022);
    });
  });

  it("returns items grouped by category", () => {
    const query = { groupBy: "category" };
    const filteredItems = filterItems(mockItems, query);
    expect(filteredItems).toEqual(expectedAllGrouped);
    // expect(filteredItems).not.toBe(expectedResult);
  });

  it("returns items filtered by date and grouped by category", () => {
    const query = {
      where: {
        startDate: new Date("2022-01-01"),
        endDate: new Date("2022-04-01"),
      },
      groupBy: "category",
    };
    const filteredItems = filterItems(mockItems, query);
    expect(filteredItems).toEqual(expectedFilteredGrouped);
  });

  it("returns no items if no item matches query", () => {
    const query = { where: { category: "test-123" } };
    const filteredItems = filterItems(mockItems, query);
    expect(filteredItems.length).toBe(0);
  });
});
