const router = require("express").Router();
const Todo = require("../../models/todo");

router.get("/", (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: "asc" })
    .then((todos) => res.render("home", { todos }));
});

module.exports = router;