const {
  helpers: {
    httpErrors: { InternalServer, NotFound },
    functionalHelpers: { to },
    response: { representAs },
  },
} = require('common');
const { updateUser } = require('../methods');

module.exports = async ({ plugins, params, payload }) => {
  const { logger } = plugins;

  const [error, user] = await to(updateUser(params.id, payload));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  if (!user) {
    throw NotFound();
  }

  return representAs('user')(user);
};
