"use strict";
const exceptionHandler = require("../errorhandler/exception.handler");
const Userservice = require("../services/user.service");

// Class Controller
class UserController {
  userService = new Userservice();

  // 이메일 중복 확인 Check Email Duplication
  checkEmailDup = async (req, res, next) => {
    const { email } = req.body;

    try {
      const result = await this.userService.checkEmailDup(email);

      return res.status(200).send(result);
    } catch (err) {
      const exception = exceptionHandler(err);

      return res.status(exception.statusCode).json(exception.message);
    }
  };

  // 닉네임 중복 확인 Check Nickname Duplication
  checkNicknameDup = async (req, res, next) => {
    const { nickname } = req.body;
    try {
      const result = await this.userService.checkNickanmeDup(nickname);

      return res.status(200).send(result);
    } catch (err) {
      const exception = exceptionHandler(err);

      return res.status(exception.statusCode).json(exception.message);
    }
  };

  // 회원가입
  signup = async (req, res, next) => {
    const { email, nickname, password } = req.body;

    try {
      const result = await this.userService.signup(email, nickname, password);

      res.status(200).json({ result });
    } catch (err) {
      const exception = exceptionHandler(err);
      res.status(exception.statusCode).send(exception.message);
    }
  };
  // 로그인
  signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const gettoken = await this.userService.signin(email, password);

      res.status(200).json({ result, token: gettoken });
    } catch (err) {
      res.status(400).json({ result: false });
    }
  };
}

module.exports = UserController;
