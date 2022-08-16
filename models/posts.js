"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init(
    {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      img: {
        type: DataTypes.STRING,
        require: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  Posts.associate = (models) => {
    models.Posts.belongsTo(models.Users, {
      foreignKey: "userId",
      targetKey:"userId",
      onDelete: "cascade",
    });
    models.Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };
  return Posts;
};
