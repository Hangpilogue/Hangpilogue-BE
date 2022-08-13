"use strict";

const Userservice = require("../services/user.service");

class UserController {
  userService = new Userservice();

  checkEmailDup = async (req, res, netx) => {
    const { email } = req.body;
    try {
      await this.userService.checkEmailDup(email);
    } catch (err) {
      res.send("이메일 형식에 맞지 않습니다.");
    }

    res.send("gd");
  };

  signup = (req, res, netx) => {
    console.log(req.body);
    const { email, nickname, password } = req.body;
    this.userService.signup(email, nickname, password);
    res.status(200).send("ㅎㅇ");
  };
}

module.exports = UserController;
