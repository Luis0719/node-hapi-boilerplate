const { db } = require('common');
const { Roles } = db.models;

module.exports = options => Roles.findAll(options);
