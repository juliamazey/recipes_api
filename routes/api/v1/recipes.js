var express = require("express");
var router = express.Router();
var fetch = require('node-fetch');
var Recipe = require('../../../models').Recipe;
require('dotenv').config();
pry = require('pryjs');


// GET recipe by dish type
router.get('/', function(req, res){
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
});

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
    created_recipe = Recipe.create({
      dish_type: recipe.params.dish_type[0],
      name: recipe.hits[0].recipe.label,
      image: recipe.hits[0].recipe.image,
      recipeUrl: recipe.hits[0].recipe.url,
      dietLabels: recipe.hits[0].recipe.dietLabels,
      healthLabels: recipe.hits[0].recipe.healthLabels,
      ingredientList: recipe.hits[0].recipe.ingredientLines,
      calories: recipe.hits[0].recipe.calories,
      cookingTime: recipe.hits[0].recipe.totalTime
    })
    .then(rec => {resolve(rec)})
    .catch(() => {})
  })
};

module.exports = router;
