const { db } = require('common');
const { Roles } = db.models.Roles;

module.exports = options => Roles.findAll(options);
