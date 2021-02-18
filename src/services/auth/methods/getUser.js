const { db } = require('common');
const { User } = db.models;

module.exports = username =>
  User.findOne({
    username,
  }).exec();
