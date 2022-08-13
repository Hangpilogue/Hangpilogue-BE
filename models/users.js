"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        require: true,
      },
      nickname: {
        type: DataTypes.STRING,
        unique: true,
        require: true,
      },
      password: {
        type: DataTypes.STRING,
        require: true,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  // Users.associate = (models) => {
  //   models.Users.hasMany(models.포스트, {
  //     foreignKey: "null",
  //     onDelete: "cascade",
  //   });
  // };
  return Users;
};
