'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comments.init(
    {
      commentId: {
        allowNull: false, // 반드시 존재해야하는 값
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nickname: DataTypes.STRING,
      content: {
        type: DataTypes.STRING,
        require: true
      },
      postId: DataTypes.INTEGER,
    }, {
    sequelize,
    modelName: 'Comments',
  });
  Comments.associate = (models) => {
    models.Comments.belongsTo(models.Posts, {
      foreignKey: "postId",
      targetKey:"postId",
      onDelete: "cascade",
    });
  };
  return Comments;
};