'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'user1@gmail.com',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'user2@gmail.com',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        email: 'user3@gmail.com',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        email: 'user4@gmail.com',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        email: 'user5@gmail.com',
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
