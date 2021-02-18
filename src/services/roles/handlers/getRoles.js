const {
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAsPaginated },
    dbUtils: { buildOptions },
  },
} = require('common');
const { getRoles, buildFilterCondition } = require('../methods');

module.exports = async ({ logger, query }) => {
  const options = buildOptions(query);
  options.where = buildFilterCondition(query);

  const [error, roles] = await to(getRoles(options));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return representAsPaginated('role')(roles);
};
