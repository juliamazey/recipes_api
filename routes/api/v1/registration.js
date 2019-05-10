const express = require("express");
const router = express.Router();
const User = require('../../../models').User;
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4')
pry = require('pryjs')

router.post('/', function(req, res) {
  if (req.body.password != req.body.password_confirmation) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Passwords do not match" }));
  }
  else {
    User.findOne({
      where: { email: req.body.email }
    })
    .then(user => {
      if (user) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Email has been taken" }));
      }
      else {
        let password = bcrypt.hashSync(req.body.password, 10)
        User.create({
          email: req.body.email,
          password: password,
          apiKey: uuidv4()
        })
        .then(user => {
          res.setHeader("Content-Type", "application/json");
          res.status(201).send(JSON.stringify( {api_key: user.api_key} ));
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(400).send({ error });
        });
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({ error });
    });
  }
});

module.exports = router;
