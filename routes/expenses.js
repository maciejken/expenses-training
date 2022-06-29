import { Router } from "express";
import { create, find, findAll, remove, update } from "../db/jsonDb.js";
import {
  checkDatesInQuery,
  checkTitle,
  checkAmount,
  checkDateInBody,
} from "../middlewares/validation.js";

const expensesRouter = new Router();
const collection = "expenses";

expensesRouter.get("/", checkDatesInQuery, async (req, res) => {
  const { from, to, category, groupBy } = req.query;
  const startDate = from ? new Date(from) : null;
  const endDate = to ? new Date(to) : null;
  const dbQuery = { where: { startDate, endDate, category }, groupBy };
  const expenses = await findAll(collection, dbQuery);
  res.json(expenses);
});

expensesRouter.post(
  "/",
  checkTitle,
  checkAmount,
  checkDateInBody,
  async (req, res, next) => {
    let { title, amount, category, date } = req.body;
    if (!category) {
      category = "uncategorized";
    }
    const newDate = new Date(date);
    date = newDate.toISOString();
    const newItem = await create(collection, {
      title,
      amount,
      category,
      date,
    });
    res.json(newItem);
  }
);

expensesRouter.get("/:id", async (req, res) => {
  const expense = await find(collection, req.params.id);
  res.json(expense);
});

expensesRouter.patch("/:id", async (req, res) => {
  const payload = { ...req.body, id: req.params.id };
  const updatedItem = await update(collection, payload);
  res.json(updatedItem);
});

expensesRouter.delete("/:id", async (req, res) => {
  const result = await remove(collection, req.params.id);
  res.json(result);
});

export default expensesRouter;

// cjs: module.exports = expensesRouter;
