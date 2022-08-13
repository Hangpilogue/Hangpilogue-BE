"use strict";
const bcrypt = require("bcrypt");
const Userservice = require("../services/user.service");

class UserController {
  userService = new Userservice();

  checkEmailDup = async (req, res, next) => {
    const { email } = req.body;
    try {
      const result = await this.userService.checkEmailDup(email);
      return res.status(200).json({ result });
    } catch (err) {
      return res.status(400).json({ result: err.message });
    }
  };
  checkNicknameDup = async (req, res, next) => {
    const { nickname } = req.body;
    try {
      const result = await this.userService.checkNickanmeDup(nickname);
      return res.status(200).json({ result });
    } catch (err) {
      return res.status(400).json({ result: err.message });
    }
  };

  signup = async (req, res, next) => {
    const { email, nickname, password } = req.body;
    try {
      this.userService.signup(email, nickname, password);
      res.status(200).send("ㅎㅇ");
    } catch (err) {
      res.status(400).send("gd");
    }
  };
}

module.exports = UserController;
