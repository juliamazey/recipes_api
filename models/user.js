const bcrypt = require('bcrypt');
const invalid_message = 'Invalid username or password'
const SendResponse = require('../pojos/responses');
const response = new SendResponse
const mail_taken = 'Email has been taken'
const uuidv4 = require('uuid/v4')


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
      .catch((error) => { reject(invalid_message)} )
    })
  };

  User.prototype.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password)
  }

  User.login = function(email, password, res) {
    if (email && password) {
      return new Promise(function(resolve, reject) {
        User.findUser(email)
        .then(user => {
          user.checkPassword(password) ? resolve(user) : reject(response.statusMessage(res, 401, invalid_message))
        })
        .catch(error => {
          response.statusMessage(res, 401, invalid_message)
        })
      })
    }
    else {
      response.statusMessage(res, 401, 'You need to send a password and email')
    }
  }

  User.creation = function(password, res, email){
    var pass = bcrypt.hashSync(password, 10)
    user = User.create({
      email: email,
      password: pass,
      apiKey: uuidv4()
    })
    return user
  }

  function checkSamePasswords(password, password_confirmation, res){
    if (password != password_confirmation) {
      response.statusMessage(res, 400, 'Passwords do not match')
    }
    else {
      return true
    }
  }

  User.registration = function(password, password_confirmation, res, email){
    checkSamePasswords(password, password_confirmation, res)
    return new Promise(function(resolve, reject){
      User.findUser(email)
      .then(user => {
        user ? reject(mail_taken) : resolve(User.creation(password, res, email))
      })
      .catch(error => {
        response.statusMessage(res, 401, "You need to send a password and email")
      })

    })
  }


  return User;
};
