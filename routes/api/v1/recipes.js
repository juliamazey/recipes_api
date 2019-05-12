var express = require("express");
var router = express.Router();
var fetch = require('node-fetch');
var Recipe = require('../../../models').Recipe;
var User = require('../../../models').User;
var UserRecipe = require('../../../models').UserRecipe;
require('dotenv').config();
pry = require('pryjs');


// GET recipe by dish type
router.get('/', function(req, res){
  if (req.query.dish_type && req.query.search){
    getRecipe(req.query.dish_type, req.query.search)
    .then(function(fetched_recipe){
      createRecipe(fetched_recipe)
      .then(recipe => {
        res.status(200).send(recipe);
      })
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({ error });
    })
  }
  else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ error: "You need to add a dish type and recipe name" });
  }
});

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

// Helper Functions
function getRecipe(dish_type, search_query) {
  var url = `https://api.edamam.com/search?q=${search_query}&app_id=${process.env.app_id}&app_key=${process.env.app_key}&dish_type=${dish_type}`
  var fetched = fetch(url)
  .then(function(location_response){
    return location_response.json();
  })
  return fetched
};


function createRecipe(recipe) {
  return new Promise(function(resolve,reject) {
    Recipe.create({
      name: recipe.hits[0].recipe.label,
      dishType: recipe.params.dish_type[0],
      image: recipe.hits[0].recipe.image,
      recipeUrl: recipe.hits[0].recipe.url,
      dietLabels: recipe.hits[0].recipe.dietLabels,
      healthLabels: recipe.hits[0].recipe.healthLabels,
      ingredientList: recipe.hits[0].recipe.ingredientLines,
      calories: recipe.hits[0].recipe.calories,
      cookingTime: recipe.hits[0].recipe.totalTime
    })
    .then(rec =>{resolve(rec)})
    .catch(() => {})
  })
};

module.exports = router;
