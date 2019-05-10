'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    recipeUrl: DataTypes.STRING,
    dietLabels: DataTypes.ARRAY,
    healthLabels: DataTypes.ARRAY,
    ingredientList: DataTypes.ARRAY,
    calories: DataTypes.FLOAT,
    cookingTime: DataTypes.FLOAT
  }, {});
  Recipe.associate = function(models) {
    Recipe.hasMany(models.UserRecipes);
    Recipe.belongsToMany(models.Users, {through: models.UserRecipes});
  };
  return Recipe;
};
