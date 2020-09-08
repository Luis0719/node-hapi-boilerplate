const { helpers } = require('common');
const { updateUser } = require('../methods');

const { InternalServer, NotFound } = helpers.httpErrors;
const { to } = helpers.functionalHelpers;

module.exports = async ({ plugins, params, payload }) => {
  const { logger } = plugins;

  const [ error, user ] = await to(updateUser(params.id, payload));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  if (!user) {
    throw NotFound();
  }

  return user;
}
