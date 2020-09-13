const {
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAsPaginated },
    sequelize: { buildSequelizeOptions },
  },
} = require('common');
const { getRoles, buildFilterCondition } = require('../methods');

module.exports = async ({ plugins, query }) => {
  const { logger } = plugins;

  const options = buildSequelizeOptions(query);
  options.where = buildFilterCondition(query);

  const [error, roles] = await to(getRoles());

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return representAsPaginated('role')(roles);
};
