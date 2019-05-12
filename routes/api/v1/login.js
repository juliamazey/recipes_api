var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');
pry = require('pryjs')


/*POST new session*/
router.post('/', function(req, res) {
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
});

module.exports = router;
