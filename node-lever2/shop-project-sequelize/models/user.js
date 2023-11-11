'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      userId: {
        primaryKey: true, // 기본키를 선언하겠다
        type: DataTypes.INTEGER, // integer 타입
      },
      email: DataTypes.STRING, // STRING 타입
      nickname: DataTypes.STRING, // STRING 타입
      password: DataTypes.STRING, // STRING 타입
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
