const User = require('../models').User;
const SendResponse = require('../pojos/responses');
const response = new SendResponse
const bcrypt = require('bcrypt');
pry = require('pryjs');

// POST user login
const create = (req, res) => {
  User.userLogin(req.body.email, req.body.password, res)
  .then(user => {
    response.status200Key(res, user.apiKey)
  })
  .catch(error => {
    response.statusMessage(res, 401, "Invalid username or password")
  })
};


module.exports = { create };
