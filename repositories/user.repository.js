"use strict";
const { Users } = require("../models");
const { UnkownException } = require("../exception/customException");

class UserRepository {
  checkEmailDup = async (email) => {
    return await Users.findOne({ where: { email } });
  };

  checkNickanmeDup = async (nickname) => {
    return await Users.findOne({ where: { nickname } });
  };

  createUser = async (email, nickname, password) => {
    try {
      await Users.create({ email, nickname, password });
    } catch (err) {
      throw new UnkownException(err.parent.code);
    }
  };

  checkUserDup = async (email) => {
    const data = await Users.findOne({ where: { email }, raw: true });
    return data;
  };
}

module.exports = UserRepository;
