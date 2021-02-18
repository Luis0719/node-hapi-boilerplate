const { db } = require('common');
const { User } = db.models;

module.exports = ({ filter = {}, attributes, options }) =>
  User.find(filter, attributes, options).exec();
