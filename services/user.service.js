"use strict";
const UserRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class Userservice {
  userRepositroy = new UserRepository();

  checkEmailDup = async (email) => {
    const result = await this.userRepositroy.checkEmailDup(email);

    if (result.email === email) throw Error(false);
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
    // 회원가입이 되어있는 사람의 정보가 또 들어오지 않게해야하는데?
    // 서버에서 하나?
    await this.userRepositroy.createUser(email, nickname, encryptedPW);
  };

  signin = async (email, password) => {
    const userInfo = await this.userRepositroy.checkUserDup(email);

    if (userInfo) {
      const SECERT_KEY = process.env.SECERT_KEY;
      const isSame = bcrypt.compareSync(password, userInfo.password);

      if (isSame) {
        const payload = {
          nickname: userInfo.nickname,
          userId: userInfo.userId,
          // 기한 정하기
        };
        const token = jwt.sign(payload, SECERT_KEY);
        // 수정
        return token;
      } else throw Error(false);
    } else throw Error(false);
  };
}

module.exports = Userservice;
