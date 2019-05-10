var express = require("express");
var router = express.Router();
var fetch = require('node-fetch');
var Recipe = require('../../../models').Recipe;
require('dotenv').config();
pry = require('pryjs');


// GET recipe by dish type
router.get('/', function(req, res){
  var dish_type = req.query.dish_type
  var search_query = req.query.search_query
  Recipe.findOne({
    where:
      { dish_type: dish_type,
        search_query: search_query }
    })
    .then(recipe => {
      eval(pry.it)
      if (recipe === null) {

      }
      else {
        getRecipe(dish_type, search_query)
        .then(function(fetched_recipe){
          createRecipe(fetched_recipe)
        })
        .then(recipe => {
          res.status(200).send(recipe);
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({ error });
        })
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
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
  Recipe.create({
    dish_type: recipe,
    name: recipe,
    image: recipe,
    recipeUrl: recipe,
    dietLabels: recipe,
    healthLabels: recipe,
    ingredientList: recipe,
    calories: recipe,
    cookingTime: recipe
  })
}

module.exports = router;
