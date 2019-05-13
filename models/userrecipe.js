const SendResponse = require('../pojos/responses');
const response = new SendResponse

'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRecipe = sequelize.define('UserRecipe', {
    UserId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  UserRecipe.associate = function(models) {
    UserRecipe.belongsTo(models.User);
    UserRecipe.belongsTo(models.Recipe);
  };

  UserRecipe.saveById = function(userId, recipeId, res){
    addRecipeToUser(userId, recipeId)
    .then(userRecipe => {
      response.statusMessage(res, 201, 'Recipe has been saved!');
    })
    .catch(error => {
      response.statusMessage(res, 400, 'Recipe could not be saved');
    });
  }

  function addRecipeToUser(userId, recipeId){
    return new Promise(function(resolve, reject) {
      UserRecipe.findOrCreate({
        where: {
          UserId: userId,
          RecipeId: recipeId
        }
      })
      .then(userRec =>{resolve(userRec)})
      .catch(error => {reject(error)})
    })
  }

  UserRecipe.deleteById = function(userId, recipeId, res){
    var err = `No recipe found with id ${recipeId}`
    deleteUserRecipe(userId, recipeId)
    .then(recipe => {
      recipe === 0 ? response.statusMessage(res, 404, err) : response.status204(res)
    })
    .catch(error => {
      response.statusMessage(res, 404, err);
    });
  };

  function deleteUserRecipe(userId, recipeId) {
    return new Promise(function(resolve, reject) {
      UserRecipe.destroy({
        where: {
          UserId: userId,
          RecipeId: recipeId
        }
      })
      .then(userRec =>{resolve(userRec)})
      .catch(error => {reject(error)})
    })
  }

  return UserRecipe;
};
