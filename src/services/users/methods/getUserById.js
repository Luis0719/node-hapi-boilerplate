const { db } = require('common');
const { User } = db.models;

module.exports = ({ id, attributes = null, options = {} }) =>
  User.findById(id, attributes, options).exec();
