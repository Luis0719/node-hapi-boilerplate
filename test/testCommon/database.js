const mongoose = require('mongoose');
const models = require('common').db.models;

const initDatabase = async () => {
  for (const collection in mongoose.connection.collections) {
    await mongoose.connection.collections[collection].deleteMany({});
  }
};

module.exports = {
  factories: require('./factories'),
  initDatabase,
  models,
};
