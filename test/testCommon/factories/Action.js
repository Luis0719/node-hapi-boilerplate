const { db } = require('common');
const { Action } = db.models;

const defaultValues = {
  path: '/test',
  method: 'get',
  name: 'test',
};

module.exports = {
  Model: Action,
  defaultValues,
}
