const db = require('../../../database');
const { User } = db.models;

module.exports = (where) => User.findOne({ where });