const express = require("express");
const mongoose = require("mongoose");
const exhbs = require("express-handlebars");
const Todo = require("./models/todo");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

require("dotenv").config();

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!", process.env.MONGO_URL);
});
db.once("open", () => {
  console.log("mongodb connected!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: "asc" })
    .then((todos) => res.render("home", { todos }));
});

app.get("/todos/new", (req, res) => {
  res.render("new");
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .lean()
    .then((todo) => res.render("detail", { todo }));
});

app.get("/todos/:id/edit", (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .lean()
    .then((todo) => res.render("edit", { todo }));
});

app.post("/todos", (req, res) => {
  const name = req.body.name;
  Todo.create({ name })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { name, isDone } = req.body;

  Todo.findById(id)
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === "on";
      return todo.save();
    })
    .then(() => {
      return res.redirect(`/todos/${id}`);
    })
    .catch((err) => console.log(err));
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
