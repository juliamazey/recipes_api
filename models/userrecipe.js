'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRecipe = sequelize.define('UserRecipe', {
    UserId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  UserRecipe.associate = function(models) {
    // associations can be defined here
  };
  return UserRecipe;
};