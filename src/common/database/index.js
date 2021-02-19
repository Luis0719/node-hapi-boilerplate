const mongoose = require('mongoose');
const { connectionUri, options } = require('./config');

const connect = (logger) => {
  mongoose.connect(connectionUri, options, (err) => {
    if (err) {
      throw err;
    }

    logger?.info('Connected to database');
  });
};

const models = {
  Action: require('./models/Action'),
  ActionGroup: require('./models/ActionGroup'),
  Role: require('./models/Role'),
  User: require('./models/User'),
};

module.exports = {
  connect,
  models,
};
