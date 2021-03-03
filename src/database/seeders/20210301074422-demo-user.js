/* eslint-disable arrow-body-style */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Admin',
        lastName: 'all',
        email: 'admin@test.test',
        password:
          '$2b$10$8eToveRwfP5MoPQmhcbX1eMSFGKPbW0HEh592vqLLZkQlAdURqrLu',
        role: 'admin',
        comfirmed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Creator',
        lastName: 'writting only',
        email: 'creator@test.test',
        password:
          '$2b$10$8eToveRwfP5MoPQmhcbX1eMSFGKPbW0HEh592vqLLZkQlAdURqrLu',
        role: 'creator',
        comfirmed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'User',
        lastName: 'reading ',
        email: 'user@test.test',
        password:
          '$2b$10$8eToveRwfP5MoPQmhcbX1eMSFGKPbW0HEh592vqLLZkQlAdURqrLu',
        role: 'user',
        comfirmed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  },
};
