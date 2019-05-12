const bcrypt = require('bcrypt');
const message = 'Invalid username or password'
const SendResponse = require('../pojos/responses');
const response = new SendResponse


'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    apiKey: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.UserRecipe);
    User.belongsToMany(models.Recipe, {through: models.UserRecipe});
  };

  User.findUser = function(email){
    return new Promise(function(resolve, reject) {
      User.findOne({
        where: { email: email }
      })
    .then(user =>{ resolve(user) })
    .catch((error) => { reject(response.statusMessage(res, 401, message))} )
    })
  };

  User.prototype.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password)
  }

  User.userLogin = function (email, password, res) {
    if (email && password) {
      return new Promise(function(resolve, reject) {
        User.findUser(email)
        .then(user => {
          user.checkPassword(password) ? resolve(user) : reject(response.statusMessage(res, 401, message))
        })
        .catch(error => {
          response.statusMessage(res, 401, message)
        })
      })
    }
    else {
      response.statusMessage(res, 401, "You need to send a password and email")
    }
  }

  return User;
};
