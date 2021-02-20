const { db } = require('common');
const { User } = db.models;

const defaultValues = {
  first_name: 'firstname',
  last_name: 'lastname',
  username: 'test',
  password: 'test',
};

module.exports = {
  Model: User,
  defaultValues,
};
