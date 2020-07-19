const db = require('db');
const { User } = db.models;

module.exports = (id) => User.findByPk(id, { raw: true });