const express = require("express");
const router = express.Router();
const loginController = require('../../../controllers/login_controller')

router.post('/', loginController.create);

module.exports = router;
