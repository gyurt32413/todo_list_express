const router = require("express").Router();
const Todo = require("../../models/todo");

router.get("/new", (req, res) => {
  res.render("new");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .lean()
    .then((todo) => res.render("detail", { todo }));
});

router.get("/:id/edit", (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .lean()
    .then((todo) => res.render("edit", { todo }));
});

router.post("", (req, res) => {
  const name = req.body.name;
  Todo.create({ name })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
