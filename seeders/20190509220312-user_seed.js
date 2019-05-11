'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'user1@gmail.com',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@gmail.com',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user3@gmail.com',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user4@gmail.com',
        password: 'password',
        apiKey: 'key',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
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
