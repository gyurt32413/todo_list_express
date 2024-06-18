const express = require("express");
const mongoose = require("mongoose");
const exhbs = require("express-handlebars");

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

app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
