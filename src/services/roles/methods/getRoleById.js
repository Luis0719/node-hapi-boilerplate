const { db } = require('common');
const { Role } = db.models;

module.exports = ({ id, attributes, options }) =>
  Role.findById(id, attributes, options).exec();
