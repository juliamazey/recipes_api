const Recipe = require('../models').Recipe;
const User = require('../models').User;
const UserRecipe = require('../models').UserRecipe;
const fetch = require('node-fetch');
require('dotenv').config();
pry = require('pryjs');

// GET recipe by dish type
const show = (req, res) => {
  if (req.query.dish_type && req.query.search){
    getRecipe(req.query.dish_type, req.query.search)
    .then(function(fetched_recipe){
      createRecipe(fetched_recipe)
      .then(recipe => {
        res.status(200).send(recipe);
      });
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
}

// POST to save recipe by id
const create = (req, res) => {
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
}

// DELETE recipe by id
const destroy = (req, res) => {
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
}

// GET sorted recipes
const index = (req, res) => {
  User.findOne({
    where: { apiKey: req.body.apiKey }
  })
  .then(user => {
    if (user == null) {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
    }
    else {
      if (req.params.order == 'sort_time') {
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
        });
      }
      if (req.params.order == 'sort_calories') {
        Recipe.findAll({
          include: {
              model: UserRecipe,
              where: { 'UserId': user.id },
              attributes: []
            },
          order: ['calories'],
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
        });
      }
      if (req.params.order == 'sort_type') {
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
        });
      }
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({ message: "Invalid API key" }));
  });
}


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

module.exports = { show, create, destroy, index };
