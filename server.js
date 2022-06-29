import express from "express";
import dotenv from "dotenv";
import http from "http";
import { syncDb } from "./db/jsonDb.js";
import expensesRouter from "./routes/expenses.js";
import errorHandler from "./middlewares/errors.js";

dotenv.config();

(async () => {
  await syncDb();
})();

const app = express();

app.use(express.json());

app.use("/api/expenses", expensesRouter);

app.use(errorHandler);

const httpServer = http.createServer(app);
const HOST = process.env.HOST;
const HTTP_PORT = process.env.HTTP_PORT;

httpServer.listen(HTTP_PORT, () => {
  console.log(`server listening at http://${HOST}:${HTTP_PORT}`);
});
