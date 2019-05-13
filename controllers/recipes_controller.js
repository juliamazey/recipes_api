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
    UserRecipe.saveById(user.id, req.params.id, res)
  })
  .catch(error => {
    response.statusMessage(res, 401, 'Invalid API key')
  });
}

// DELETE recipe by id
const destroy = (req, res) => {
  User.findUserApiKey(req.body.apiKey)
  .then(user => {
    UserRecipe.deleteById(user.id, req.params.id, req, res)
  })
  .catch(error => {
    response.statusMessage(res, 401, 'Invalid API key')
  });
};

// GET sorted recipes
const index = (req, res) => {
  User.findUserApiKey(req.body.apiKey)
  .then(user => {
    if (req.params.order == 'sort_time') {
      Recipe.sortBy('cookingTime', user.id, res)
    }
    if (req.params.order == 'sort_calories') {
      Recipe.sortBy('calories', user.id, res)
    }
    if (req.params.order == 'sort_type') {
      Recipe.sortBy('dishType', user.id, res)
    }
  })
  .catch(error => {
    response.statusMessage(res, 401, 'Invalid API key')
  });
}

module.exports = { show, create, destroy, index };
