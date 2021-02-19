const { db } = require('common');
const { User } = db.models;

const defaultValues = {
  first_name: 'test',
  last_name: 'user',
  email: 'test@example.com',
  username: 'test',
  password: 'test',
};

const preSave = async (instance) => {
  await instance.setPassword(instance.password);
};

module.exports = {
  Model: User,
  defaultValues,
  hooks: {
    preSave,
  },
};
