const SendResponse = require('../pojos/responses');
const response = new SendResponse

'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRecipe = sequelize.define('UserRecipe', {
    UserId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  UserRecipe.associate = function(models) {
    UserRecipe.belongsTo(models.User)
    UserRecipe.belongsTo(models.Recipe)
  };

  UserRecipe.saveById = function(UserId, RecipeId, res){
    UserRecipe.findOrCreate({
      where: {
        UserId: UserId,
        RecipeId: RecipeId
      }
    })
    .then(userRecipe => {
      response.statusMessage(res, 201, 'Recipe has been saved!')
    })
    .catch(error => {
      response.statusMessage(res, 400, 'Recipe could not be saved')
    });
  }

  UserRecipe.deleteById = function(UserId, RecipeId, req, res){
    UserRecipe.destroy({
      where: {
        UserId: UserId,
        RecipeId: RecipeId
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
      response.statusMessage(res, 404, `No recipe found with id ${req.params.id}`)
    });
  }
  return UserRecipe;
};
