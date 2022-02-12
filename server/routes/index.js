var express = require("express");
var router = express.Router();
const usersRouter = require("../routes/users");
const pinRouter = require("../routes/pin");

/* GET home page. */
router.use("/user", usersRouter);
router.use("/pin", pinRouter);

module.exports = router;
