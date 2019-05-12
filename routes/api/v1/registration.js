const express = require("express");
const router = express.Router();
const registrationController = require('../../../controllers/registration_controller')

router.post('/', registrationController.create);

module.exports = router;
