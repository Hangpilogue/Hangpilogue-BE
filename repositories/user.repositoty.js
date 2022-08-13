"use strict";
const { Users } = require("../models");
class UserRepository {
  checkEmailDup = async (email) => {
    return await Users.findOne({ where: { email } });
  };

  checkNickanmeDup = async (nickname) => {
    return await Users.findOne({ where: { nickname } });
  };

  createUser = async (email, nickname, password) => {
    await Users.create({ email, nickname, password });
  };
}

module.exports = UserRepository;
