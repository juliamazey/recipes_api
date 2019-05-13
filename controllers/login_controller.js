const User = require('../models').User;
const SendResponse = require('../pojos/responses');
const response = new SendResponse
const bcrypt = require('bcrypt');
pry = require('pryjs');

// POST user login
const create = (req, res) => {
  User.login(req.body.email, req.body.password, res)
  .then(user => {
    response.statusKey(res, 200, user.apiKey);
  })
  .catch(error => {
    response.statusMessage(res, 401, "Invalid username or password");
  });
};


module.exports = { create };
