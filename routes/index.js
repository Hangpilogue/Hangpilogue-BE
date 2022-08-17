"use strict";

const express = require("express");
const router = express.Router();

const signRoter = require("./user");
const postRouter = require("./post");
const commentRouter = require("./comment")

router.use("/api", router);
router.use("/user", signRoter);
router.use("/posts", postRouter, commentRouter);

module.exports = router;
