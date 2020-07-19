const db = require('db');
const { User } = db.models;

module.exports = (where) => User.findOne({ where, raw: true });