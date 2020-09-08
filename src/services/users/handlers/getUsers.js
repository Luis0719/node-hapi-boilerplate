const { helpers } = require('common');
const {
  buildFilterCondition,
  getUsers,
} = require('../methods');

const { to } = helpers.functionalHelpers;
const { InternalServer } = helpers.httpErrors;
const { buildSequelizeOptions } = helpers.sequelize;

module.exports = async ({ plugins, query }, methods) => {
  const { logger } = plugins;

  const options = buildSequelizeOptions(query);
  options.where = buildFilterCondition(query);

  const [ error, users ] = await to(getUsers(options));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return users;
}
