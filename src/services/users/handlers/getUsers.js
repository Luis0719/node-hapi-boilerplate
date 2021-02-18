const {
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAsPaginated },
    dbUtils: { buildOptions },
  },
} = require('common');
const { buildFilterCondition, getUsers } = require('../methods');

module.exports = async ({ logger, query }) => {
  const options = buildOptions(query);
  const filter = buildFilterCondition(query);

  const [error, users] = await to(getUsers({ filter, options }));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return representAsPaginated('user')(users);
};
