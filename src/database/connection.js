const Sequelize = require('sequelize');
const config = require('../database/config');

const connection = new Sequelize(config);
connection.authenticate().then(() => {
  console.log(`Connection to ${config.host} has been established successfully.`);
}).catch(err => {
  console.error('Unable to connect to the database');
  throw error;
});

module.exports = connection;