const User = require('../models').User;
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
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify({ apiKey: user.apiKey }))
      }
      else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify("Invalid username or password"));
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({error: "Invalid username or password"}));
    })
  }
  else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: "You need to send a password and email"}));
  }
};


module.exports = { create };
