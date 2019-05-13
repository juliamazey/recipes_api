const User = require('../models').User;
const SendResponse = require('../pojos/responses');
const response = new SendResponse
pry = require('pryjs');

// POST user registration
const create = (req, res) => {
  var pass = req.body.password;
  var pass_conf = req.body.password_confirmation;
  var mail = req.body.email;
  User.registration(pass, pass_conf, res, mail)
  .then(user => {
    response.statusKey(res, 201, user.apiKey);
  })
  .catch(error => {
    response.statusMessage(res, 400, error);
  });
};

module.exports = { create };
