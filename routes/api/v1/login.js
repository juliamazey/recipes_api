const express = require("express");
const router = express.Router();
const loginController = require('../../../controllers/login_controller')

// POST user login
router.post('/', loginController.create);

module.exports = router;
