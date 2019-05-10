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
  return Recipe;
};
