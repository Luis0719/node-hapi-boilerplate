const { helpers } = require('common');
const { getRoles, buildFilterCondition } = require('../methods');

const { to } = helpers.functionalHelpers;
const { InternalServer } = helpers.httpErrors;
const { buildSequelizeOptions } = helpers.sequelize;

module.exports = async ({ plugins, query }) => {
  const { logger } = plugins;

  const options = buildSequelizeOptions(query);
  options.where = buildFilterCondition(query);

  const [error, roles] = await to(getRoles());

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return roles;
};
