var express = require("express");
var router = express.Router();
var fetch = require('node-fetch');
var Recipe = require('../../../models').Recipe;
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
