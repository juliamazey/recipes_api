'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      recipeUrl: {
        type: Sequelize.STRING
      },
      dietLabels: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      healthLabels: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      ingredientList: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      calories: {
        type: Sequelize.FLOAT
      },
      cookingTime: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipes');
  }
};
