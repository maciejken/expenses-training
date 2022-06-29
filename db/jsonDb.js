import { Low, JSONFile } from "lowdb";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
import { filterItems } from "../utils/filterItems.esm.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

const initialData = {
  expenses: [],
  users: [],
};

export const syncDb = async () => {
  await db.read();

  const hasData = !!db.data;
  db.data ||= initialData;

  if (!hasData) {
    await db.write();
    console.log("db.json created!");
  }
};

export const find = async (name, itemId) => {
  await db.read();
  return db.data[name].find((d) => d.id === itemId) || null;
};

export const findAll = async (name, query) => {
  await db.read();
  const items = db.data[name];
  return filterItems(items, query);
};

export const create = async (name, newData) => {
  await db.read();
  const newItem = { id: nanoid(), ...newData };
  db.data[name].push(newItem);
  await db.write();
  return newItem;
};

export const update = async (name, updatedData) => {
  await db.read();
  let isUpdated = false;
  db.data[name] = db.data[name].map((item) => {
    if (item.id === updatedData.id) {
      isUpdated = true;
      return updatedData;
    }
    return item;
  });

  await db.write();
  return isUpdated ? updatedData : null;
};

export const remove = async (name, itemId) => {
  await db.read();
  const oldData = db.data[name];
  const newData = oldData.filter((item) => item.id !== itemId);
  db.data[name] = newData;
  await db.write();
  return newData.length < oldData.length ? oldData.length - newData.length : 0;
};
