const { db, helpers } = require('common');
const buildFilterCondition = require('./buildFilterCondition');

const { buildOptions } = helpers.dbUtils;
const { User } = db.models;

module.exports = (query, options = {}) => {
  if (query.roles) query.roles = query.roles.split(',');

  const filter = buildFilterCondition(query);
  Object.assign(options, buildOptions(query)); // some options need to be parsed for each ORM

  return User.find(filter, null, options).exec();
};
