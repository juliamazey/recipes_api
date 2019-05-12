'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('UserRecipes', [
      {
        UserId: 1,
        RecipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        RecipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        RecipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        RecipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        RecipeId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 3,
        RecipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 3,
        RecipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 4,
        RecipeId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRecipes', null, {});
  }
};
