const express = require("express");
const router = express.Router();
const User = require('../../../models').User;
const loginController = require('../../../controllers/login_controller')
const bcrypt = require('bcrypt');
pry = require('pryjs')

router.post('/', loginController.create);


module.exports = router;
