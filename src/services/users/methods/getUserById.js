const { db } = require('common');
const { Users } = db.models;

module.exports = (id, options = {}) => Users.findByPk(id, options);
