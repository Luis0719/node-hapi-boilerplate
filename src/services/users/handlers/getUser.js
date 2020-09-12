const { helpers } = require('common');
const { getUserById } = require('../methods');

const { to } = helpers.functionalHelpers;
const { InternalServer, NotFound } = helpers.httpErrors;

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

  return user;
};
