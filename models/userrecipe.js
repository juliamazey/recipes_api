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
  return UserRecipe;
};
