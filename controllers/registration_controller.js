const User = require('../models').User;
const SendResponse = require('../pojos/responses');
const response = new SendResponse
pry = require('pryjs');

// POST user registration
const create = (req, res) => {
  let pass = req.body.password
  let pass_conf = req.body.password_confirmation
  let mail = req.body.email
  User.registration(pass, pass_conf, res, mail)
  .then(user => {
    response.statusKey(res, 201, user.apiKey)
  })
  .catch(error => {
    response.statusMessage(res, 400, error)
  });
};

module.exports = { create };
