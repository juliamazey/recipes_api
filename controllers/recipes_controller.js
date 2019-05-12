const Recipe = require('../models').Recipe;
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
          response.status400Error(res, error)
        })
      }
      else {
        response.status400Error(res, "Sorry, we could not find a recipe")
      }
    })
    .catch(error => {
      response.status400Error(res, error)
    })
  }
  else {
    response.status400Error(res, "You need to add a dish type and recipe name")
  }
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

module.exports = { show };
