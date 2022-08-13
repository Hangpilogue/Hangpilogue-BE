"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/dup/email", userController.checkEmail);
router.post("/signup", userController.signup);

module.exports = router;
