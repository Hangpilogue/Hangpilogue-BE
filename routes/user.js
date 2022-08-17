"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const signMiddleware = require("../middlewares/sign.middleware");

// Get Class
const userController = new UserController();

// Middlewares
router.use(signMiddleware);

// Routers
router.post("/dup/email", userController.checkEmailDup);
router.post("/dup/nickname", userController.checkNicknameDup);
router.post("/signup", userController.signup);
router.post("/login", userController.signin);

module.exports = router;
