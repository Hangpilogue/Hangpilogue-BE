"use strict";
const UserRepository = require("../repositories/user.repositoty");
const crypto = require("crypto");
const Joi = require("joi");
class Userservice {
  userRepositroy = new UserRepository();

  checkEmailDup = async (email) => {
    await this.userRepositroy.checkEmailDup(email);
  };

  signup = (email, nickname, password) => {
    // joi로 컨트롤러에 오기전에 미들웨어 막기 했다고 가정
    // 중복체크도 만들어야함
    const salt = crypto.randomBytes(128).toString("base64");
    console.log(salt);
    //   this.userRepositroy.creatUser();
  };
}

module.exports = Userservice;
