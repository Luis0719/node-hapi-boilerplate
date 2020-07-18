const db = require('foxAdminDb');
const { User } = db.models;

module.exports = (id) => User.findByPk(id);