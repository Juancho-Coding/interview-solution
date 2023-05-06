import express from "express";
import bodyParser from "body-parser";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { toDoItem, dbData } from "./types.js";

const app = express();

// initialization of the lowdb library
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");
const defaultData: dbData = { items: [], max: 0 };
const adapter = new JSONFile<dbData>(file);
const db = new Low<dbData>(adapter, defaultData);

// use bodyParser to use on post methods
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

// configure ejs
app.set("view engine", "ejs");
app.set("views", "./views");

// each tiem a request is received read the database
app.use(async (req, res, next) => {
  await db.read();
  next();
});

// entry point
app.get("/", (req, res, next) => {
  const toBeDone = db.data.items.filter((value) => !value.complete);
  const done = db.data.items.filter((value) => value.complete);
  res.render("index", {
    toBeDone: toBeDone,
    done: done,
    score: `${done.length} / ${db.data.items.length}`,
  });
});

// middleware to handle addition of new items
app.post("/add-item", (req, res, next) => {});

// middleware to handle modification of items
app.post("/action-item", (req, res, next) => {});

// middleware to handle deletion of items
app.post("/delete-item", (req, res, next) => {});

// middleware for not found
app.use((req, res, next) => {
  res.status(400).send("<h1>Page not found</h1>");
});

app.listen(3000, () => {});
