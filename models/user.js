'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    apiKey: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.UserRecipes);
    User.belongsToMany(models.Recipes, {through: models.UserRecipes});
  };
  return User;
};
