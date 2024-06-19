const express = require("express");
const mongoose = require("mongoose");
const exhbs = require("express-handlebars");
const Todo = require("./models/todo");
const bodyParser = require("body-parser");

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

app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  Todo.find()
    .lean()
    .then((todos) => res.render("home", { todos }));
});

app.get("/todos/new", (req, res) => {
  res.render("new");
});

app.post("/todos", (req, res) => {
  const name = req.body.name;
  Todo.create({ name })
    .then(() => res.redirect("/"))
    .catch((err) => console.err(err));
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .lean()
    .then((todo) => res.render("detail", { todo }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
