const SendResponse = require('../pojos/responses');
const response = new SendResponse
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
  return Recipe;
};
