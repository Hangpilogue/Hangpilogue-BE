"use strict";
const { Users } = require("../models");
class UserRepository {
  checkEmailDup = async (email) => {
    return await Users.findOne({ where: { email } });
  };
}

module.exports = UserRepository;
