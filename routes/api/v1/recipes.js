const express = require("express");
const router = express.Router();
const recipesController = require('../../../controllers/recipes_controller')

// GET recipe by dish type
router.get('/', recipesController.show);

// POST to save recipe by id
router.post('/:id', recipesController.create);

// DELETE recipe by id
router.delete('/:id', recipesController.destroy);

// GET recipes sorted by cooking time
router.get('/:order', recipesController.index);

module.exports = router;
