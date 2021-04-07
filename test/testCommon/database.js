const mongoose = require('mongoose');
const models = require('common').db.models;
const factories = require('./factories');
const prefabs = require('./prefabs')(factories);

const initDatabase = async () => {
  for (const collection in mongoose.connection.collections) {
    await mongoose.connection.collections[collection].deleteMany({});
  }
};


module.exports = {
  factories,
  initDatabase,
  models,
  prefabs,
};
