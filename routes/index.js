"use strict";

const express = require("express");
const router = express.Router();
const signRoter = require("./user");

router.use("/api", router);
router.use("/user", signRoter);

module.exports = router;
