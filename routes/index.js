const router = require("express").Router();

const home = require("./modules/home");
const todos = require("./modules/todos");

router.use("/", home);
router.use("/todos", todos);

module.exports = router;
