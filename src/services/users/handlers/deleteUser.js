const { helpers } = require('common');
const { deleteUser } = require('../methods');

const { InternalServer, NotFound } = helpers.httpErrors;
const { to } = helpers.functionalHelpers;

module.exports = async ({ plugins, params }) => {
  const { logger } = plugins;

  const [error, result] = await to(deleteUser(params.id));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  if (!result) {
    throw NotFound();
  }

  return result;
};
