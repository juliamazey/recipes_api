const SendResponse = require('../pojos/responses');
const response = new SendResponse
const fetch = require('node-fetch');
pry = require('pryjs');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    dishType: DataTypes.STRING,
    image: DataTypes.STRING,
    recipeUrl: DataTypes.STRING,
    dietLabels: DataTypes.ARRAY(DataTypes.STRING),
    healthLabels: DataTypes.ARRAY(DataTypes.STRING),
    ingredientList: DataTypes.ARRAY(DataTypes.STRING),
    calories: DataTypes.FLOAT,
    cookingTime: DataTypes.FLOAT
  }, {});
  Recipe.associate = function(models) {
    Recipe.hasMany(models.UserRecipe);
    Recipe.belongsToMany(models.User, {through: models.UserRecipe});
  };

  Recipe.sortBy = function(order, id, res){
    const UserRecipe = Recipe.sequelize.models.UserRecipe;
    return new Promise(function(resolve, reject) {
      Recipe.findAll({
        include: {
            model: UserRecipe,
            where: { 'UserId': id },
            attributes: []
          },
        order: [order],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      .then(recipes =>{
        if (recipes.length == 0) {
          response.statusMessage(res, 404, 'No recipes saved')
        }
        else {
          response.statusObject(res, 200, recipes)
        }
      })
      .catch(error => {
        eval(pry.it)
        response.statusMessage(res, 400, error)
      });
    })
  }

  Recipe.getRecipe = function(dishType, search, res){
    var url = `https://api.edamam.com/search?q=${search}&app_id=${process.env.app_id}&app_key=${process.env.app_key}&dish_type=${dishType}`
    var fetched = fetch(url)
    .then(function(location_response){
      return location_response.json();
    })
    .then(function(fetched_recipe){
      if(fetched_recipe.count > 0){
        createRecipe(fetched_recipe)
        .then(recipe => {
          response.statusObject(res, 200, recipe)
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
      .catch(error => {resolve(error)})
    })
  }
  return Recipe;
};
