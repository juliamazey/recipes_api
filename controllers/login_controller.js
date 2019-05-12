const User = require('../models').User;
const SendResponse = require('../pojos/responses');
const response = new SendResponse
const bcrypt = require('bcrypt');
pry = require('pryjs');

// POST user login
const create = (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({
      where: { email: req.body.email}
    })
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        response.status200Key(res, user.apiKey)
      }
      else {
        response.statusMessage(res, 401, "Invalid username or password")
      }
    })
    .catch(error => {
      response.statusMessage(res, 401, "Invalid username or password")
    })
  }
  else {
    response.statusMessage(res, 401, "You need to send a password and email")
  }
};


module.exports = { create };
