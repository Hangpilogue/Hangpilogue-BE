"use strict";
const UserRepository = require("../repositories/user.repository");
const {
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnkownException,
} = require("../exception/customException");

// require module
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Class Service
class Userservice {
  userRepositroy = new UserRepository();

  // 중복확인 이메일
  checkEmailDup = async (email) => {
    const checkEmail = await this.userRepositroy.checkEmailDup(email);

    if (checkEmail === null) return "이 이메일은 사용 가능한 이메일 입니다.";
    if (checkEmail.email === email)
      throw new ConflictException(`이 이메일은 사용 불가능한 이메일 입니다.`);

    throw new UnkownException("알 수 없는 오류");
  };

  checkNickanmeDup = async (nickname) => {
    const result = await this.userRepositroy.checkNickanmeDup(nickname);
    console.log(result);
    if (result === null) return `이 닉네임은 사용 가능한 닉네임 입니다.`;
    if (result.nickname === nickname)
      throw new ConflictException(`이 이메일은 사용 불가능한 닉네임 입니다.`);

    throw new UnkownException("알 수 없는 오류");
  };

  signup = async (email, nickname, password) => {
    if (!email || !nickname || !password)
      throw new BadRequestException(`입력 값을 확인해주세요.`);

    const encryptedPW = await bcrypt.hashSync(password, 10);

    await this.userRepositroy.createUser(email, nickname, encryptedPW);
    return `회원가입 되었습니다.`;
  };

  signin = async (email, password) => {
    const userInfo = await this.userRepositroy.checkUserDup(email);

    if (userInfo) {
      const SECRET_KEY = process.env.SECRET_KEY;
      const isSame = bcrypt.compareSync(password, userInfo.password);

      if (isSame) {
        const payload = {
          nickname: userInfo.nickname,
          userId: userInfo.userId,
          // 기한 정하기
        };
        const token = jwt.sign(payload, SECRET_KEY);
        return token;
      } else
        throw new UnauthorizedException("사용자 정보가 일치 하지 않습니다.");
    } else throw new UnauthorizedException("사용자 정보가 일치 하지 않습니다.");

    throw new UnkownException("알 수 없는 오류");
  };
}

module.exports = Userservice;
