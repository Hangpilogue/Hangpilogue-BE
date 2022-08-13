"use strict";
const UserRepository = require("../repositories/user.repositoty");
const bcrypt = require("bcrypt");

class Userservice {
  userRepositroy = new UserRepository();

  checkEmailDup = async (email) => {
    const result = await this.userRepositroy.checkEmailDup(email);
    //   <<<joi 라이브러리
    if (result === email) throw Error(false);
    if (result === null) return true;

    throw Error("알 수 없는 오류");
  };

  checkNickanmeDup = async (nickname) => {
    const result = await this.userRepositroy.checkNickanmeDup(nickname);

    if (result === nickname) throw Error(false);
    if (result === null) return true;

    throw Error("알 수 없는 오류");
  };

  signup = async (email, nickname, password) => {
    if (!email || !nickname || !password) throw Error(false);
    const encryptedPW = await bcrypt.hashSync(password, 10);
    console.log(encryptedPW);
    this.userRepositroy.createUser(email, nickname, encryptedPW);
  };
}

module.exports = Userservice;
