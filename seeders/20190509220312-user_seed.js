'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'user1@gmail.com',
        password: 'password',
        apiKey: 'key1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@gmail.com',
        password: 'password',
        apiKey: 'key2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user3@gmail.com',
        password: 'password',
        apiKey: 'key3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user4@gmail.com',
        password: 'password',
        apiKey: 'key4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user5@gmail.com',
        password: 'password',
        apiKey: 'key5',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
