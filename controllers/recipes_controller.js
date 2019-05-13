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
    Recipe.getRecipe(req.query.dish_type, req.query.search, res)
  }
  else {
    response.statusMessage(res, 400, "You need to add a dish type and recipe name")
  }
}

// POST to save recipe by id
const create = (req, res) => {
  User.findUserApiKey(req.body.apiKey)
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
  User.findUserApiKey(req.body.apiKey)
  .then(user => {
    if (user == null) {
      response.statusMessage(res, 401, 'Invalid API key')
    }
    else {
      UserRecipe.destroy({
        where: {
          UserId: user.id,
          RecipeId: req.params.id
        }
      })
      .then(recipe => {
        if (recipe === 0) {
          response.statusMessage(res, 404, `No recipe found with id ${req.params.id}`)
        }
        else {
          response.status204(res)
        }
      })
      .catch(error => {
        response.statusMessage(res, 404, 'No recipe found')
      });
    }
  })
  .catch(error => {
    response.statusMessage(res, 401, 'Invalid API key')
  });
}

// GET sorted recipes
const index = (req, res) => {
  User.findUserApiKey('apiKey', req.body.apiKey)
  .then(user => {
    if (user == null) {
      response.statusMessage(res, 401, 'Invalid API key')
    }
    else {
      if (req.params.order == 'sort_time') {
        Recipe.sortBy('cookingTime', user.id, res)
      }
      if (req.params.order == 'sort_calories') {
        Recipe.sortBy('calories', user.id, res)
      }
      if (req.params.order == 'sort_type') {
        Recipe.sortBy('dishType', user.id, res)
      }
    }
  })
  .catch(error => {
    response.statusMessage(res, 401, 'Invalid API key')
  });
}

module.exports = { show, create, destroy, index };
