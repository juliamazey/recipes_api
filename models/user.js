'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    apiKey: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.UserRecipe);
    User.belongsToMany(models.Recipe, {through: models.UserRecipe});
  };
  return User;
};
