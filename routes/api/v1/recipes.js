const express = require("express");
const router = express.Router();
const recipesController = require('../../../controllers/recipes_controller')
const Recipe = require('../../../models').Recipe;
const User = require('../../../models').User;
const UserRecipe = require('../../../models').UserRecipe;
pry = require('pryjs');

// GET recipe by dish type
router.get('/', recipesController.show);

// POST to save recipe by id
router.post('/:id', function(req, res){
  User.findOne({
    where: { apiKey: req.body.apiKey }
  })
  .then(user => {
    if (user == null) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
    }
    else {
      UserRecipe.findOrCreate({
        where: {
          UserId: user.id,
          RecipeId: parseInt(req.params.id)
        }
      })
      .then(userRecipe => {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify({ message: `Recipe has been saved!`}));
      })
      .catch(error => {
        if (error.name == 'SequelizeForeignKeyConstraintError') {
          res.setHeader("Content-Type", "application/json");
          res.status(404).send(JSON.stringify({ message: `No recipe found with id ${req.params.id}`}));
        }
        else {
          res.setHeader("Content-Type", "application/json");
          res.status(400).send({ error });
        }
      });
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
  });
});

// Delete favorite recipe
router.delete("/:id", function(req, res) {
  User.findOne({
    where: { apiKey: req.body.apiKey }
  })
  .then(user => {
    if (user == null) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
    }
    else {
      UserRecipe.destroy({
        where: {
          UserId: user.id,
          RecipeId: req.params.id
        }
      })
      .then(recipe => {
        if (recipe == 0) {
          res.setHeader("Content-Type", "application/json");
          res.status(404).send(JSON.stringify({ message: `No recipe found with id ${req.params.id}`}));
        }
        else {
          res.setHeader("Content-Type", "application/json");
          res.status(204).send({ recipe });
        }
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "No recipe found" }));
      });
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
  });
});

// GET recipes sorted by cooking time
router.get('/sort_time', function(req, res){
  User.findOne({
    where: { apiKey: req.body.apiKey }
  })
  .then(user => {
    if (user == null) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
    }
    else {
      Recipe.findAll({
        include: {
            model: UserRecipe,
            where: { 'UserId': user.id },
            attributes: []
          },
        order: ['cookingTime'],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      .then(recipes =>{
        if (recipes.length == 0) {
          res.setHeader("Content-Type", "application/json");
          res.status(404).send(JSON.stringify({ message: "No recipes saved" }));
        }
        else {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send({ recipes });
        }
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send({ error });
      })
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
  });
});

// GET recipes sorted by number of calories
router.get('/sort_calories', function(req, res){
  User.findOne({
    where: { apiKey: req.body.apiKey }
  })
  .then(user => {
    if (user == null) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
    }
    else {
      Recipe.findAll({
        include: {
            model: UserRecipe,
            where: { 'UserId': user.id },
            attributes: []
          },
        order: ['calories'],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      .then(recipes => {
        if (recipes.length == 0) {
          res.setHeader("Content-Type", "application/json");
          res.status(404).send(JSON.stringify({ message: "No recipes saved" }));
        }
        else {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send({ recipes });
        }
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send({ error });
      })
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
  });
});

// GET recipes sorted by dish type
router.get('/sort_type', function(req, res){
  User.findOne({
    where: { apiKey: req.body.apiKey }
  })
  .then(user => {
    if (user == null) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
    }
    else {
      Recipe.findAll({
        include: {
            model: UserRecipe,
            where: { 'UserId': user.id },
            attributes: []
          },
        order: ['dishType'],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      .then(recipes =>{
        if (recipes.length == 0) {
          res.setHeader("Content-Type", "application/json");
          res.status(404).send(JSON.stringify({ message: "No recipes saved" }));
        }
        else {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send({ recipes });
        }
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send({ error });
      })
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
  });
});

module.exports = router;
