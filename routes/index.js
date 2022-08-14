"use strict";

const express = require("express");
const router = express.Router();

const signRoter = require("./user");
const postRouter = require("./post");

router.use("/api", router);
router.use("/user", signRoter);
router.use("/api", postRouter);

module.exports = router;
