const express = require("express");
const mongoose = require("mongoose");
const exhbs = require("express-handlebars");
const Todo = require("./models/todo");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./routes");

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
app.use(routes);

app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
