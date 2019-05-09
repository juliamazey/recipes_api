'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('UserRecipes', [
      {
          id: 1,
          UserId: 1,
          RecipeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
        id: 2,
        UserId: 1,
        RecipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        UserId: 1,
        RecipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        UserId: 2,
        RecipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        UserId: 2,
        RecipeId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        UserId: 3,
        RecipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        UserId: 3,
        RecipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        UserId: 4,
        RecipeId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        UserId: 5,
        RecipeId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        UserId: 5,
        RecipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRecipes', null, {});
  }
};
