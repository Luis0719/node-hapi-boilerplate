const { db } = require('common');
const { Role } = db.models;

const defaultValues = {
  name: 'test',
  actions: [],
};

module.exports = {
  Model: Role,
  defaultValues,
}
