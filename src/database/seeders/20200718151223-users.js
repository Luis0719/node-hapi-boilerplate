'use strict';
const { bcrypt } = require('common');
const tableName = 'users'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [{
      firstName: 'admin',
      lastName: 'MHS',
      email: 'admin@mhs.com',
      username: 'admin',
      password: await bcrypt.hash('admin'),
      roles: ['admin'],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Super médico',
      lastName: 'MHS',
      email: 'supermedico@mhs.com',
      username: 'supermedico',
      password: await bcrypt.hash('supermedico'),
      roles: ['tecnico', 'radiologo'],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'radiologo',
      lastName: 'MHS',
      email: 'radiologo@mhs.com',
      username: 'radiologo',
      password: await bcrypt.hash('radiologo'),
      roles: ['rediologo'],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'técnico',
      lastName: 'MHS',
      email: 'tecnico@mhs.com',
      username: 'tecnico',
      password: await bcrypt.hash('tecnico'),
      roles: ['tecnico'],
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null, {});
  }
};
