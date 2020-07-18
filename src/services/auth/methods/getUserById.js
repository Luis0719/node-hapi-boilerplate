const db = require('../../../database');
const { User } = db.models;

module.exports = (id) => User.findByPk(id);