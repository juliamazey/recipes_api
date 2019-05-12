const Recipe = require('../models').Recipe;
const User = require('../models').User;
const UserRecipe = require('../models').UserRecipe;
const fetch = require('node-fetch');
const SendResponse = require('../pojos/responses');
const response = new SendResponse;
require('dotenv').config();
pry = require('pryjs');


// GET recipe by dish type
const show = (req, res) => {
  if (req.query.dish_type && req.query.search){
    getRecipe(req.query.dish_type, req.query.search)
    .then(function(fetched_recipe){
      if(fetched_recipe.count > 0){
        createRecipe(fetched_recipe)
        .then(recipe => {
          response.status200Object(res, recipe)
        })
        .catch(error => {
          response.statusMessage(res, 400,  error)
        })
      }
      else {
        response.statusMessage(res, 404, "Sorry, we could not find a recipe")
      }
    })
    .catch(error => {
      response.statusMessage(res, 400,  error)
    })
  }
  else {
    response.statusMessage(res, 400, "You need to add a dish type and recipe name")
  }
}

// POST to save recipe by id
const create = (req, res) => {
  User.findOne({
    where: { apiKey: req.body.apiKey }
  })
  .then(user => {
    if (user == null) {
      response.statusMessage(res, 401, "Invalid API key")
    }
    else {
      UserRecipe.findOrCreate({
        where: {
          UserId: user.id,
          RecipeId: parseInt(req.params.id)
        }
      })
      .then(userRecipe => {
        response.statusMessage(res, 201, 'Recipe has been saved!')
      })
      .catch(error => {
        response.statusMessage(res, 400, 'Recipe could not be saved')
      });
    }
  })
  .catch(error => {
    response.statusMessage(res, 401, 'Invalid API key')
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

module.exports = { show, create, destroy };
