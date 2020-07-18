'use strict';
const { DataTypes } = require('sequelize');

const {
  Model
} = require('sequelize');
module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      console.log("ASSOCIATING USERS");
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    image: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    roles: DataTypes.ARRAY(
      DataTypes.INTEGER
    ),
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  User.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
  }

  return User;
};