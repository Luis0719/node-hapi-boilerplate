const { db } = require('common');
const { Users } = db.models;

module.exports = data => Users.create(data);
