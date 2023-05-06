import express from "express";
import bodyParser from "body-parser";

import { toDoItem } from "./types.js";

const app = express();

// use bodyParser to use on post methods
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configure ejs
app.set("view engine", "ejs");
app.set("views", "./views");

// entry point
app.get("/", (req, res, next) => {
  res.render("index", {});
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
