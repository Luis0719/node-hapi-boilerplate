const { DataTypes } = require('sequelize');
const connection = require('./connection');
const schemas = require('./models');
const associateModels = require('./associateModels');
const models = {};

schemas.map((schema) => {
  const model = schema(connection, DataTypes);
  models[model.name] = model;
});

associateModels(models);

module.exports = {
  connection,
  models,
};