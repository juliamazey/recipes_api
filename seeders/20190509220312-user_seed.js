'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'User 1',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'User 2',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'User 3',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'User 4',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'User 5',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
