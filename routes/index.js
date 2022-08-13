const express = require("express");
const router = express.Router();
const postRouter = require("./post");

router.use("/api", postRouter);

module.exports = router;
