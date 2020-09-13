const {
  helpers: {
    httpErrors: { InternalServer, NotFound },
    functionalHelpers: { to },
    response: { representAs },
  },
} = require('common');
const { getUserById } = require('../methods');

module.exports = async ({ plugins, params }) => {
  const { logger } = plugins;

  const [error, user] = await to(getUserById(params.id));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  if (!user) {
    throw NotFound();
  }

  logger.info(user);
  logger.info(user.created_at);

  return representAs('user')(user);
};
