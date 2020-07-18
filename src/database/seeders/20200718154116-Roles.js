'use strict';
const tableName = 'roles';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [{
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'radiologo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'tecnico',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
