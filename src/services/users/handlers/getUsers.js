const {
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAsPaginated },
  },
} = require('common');
const { getUsers } = require('../methods');

module.exports = async ({ logger, query }) => {
  const [error, users] = await to(getUsers(query));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return representAsPaginated('user')(users);
};
