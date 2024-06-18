const mongoose = require("mongoose");
const Todo = require("../todo");

require("dotenv").config();

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

  for (let i = 0; i < 10; i++) {
    Todo.create({
      name: `name-${i}`,
    });
  }
});
