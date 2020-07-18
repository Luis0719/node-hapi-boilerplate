const db = require('foxAdminDb');
const { User } = db.models;

module.exports = (where) => User.findOne({ where });