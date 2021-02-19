const { helpers } = require('common');
const { InternalServer, Unauthorized } = helpers.httpErrors;
const { to } = helpers.functionalHelpers;

const { login } = require('../methods');

module.exports = async ({ logger, payload }) => {
  const [error, token] = await to(login(payload.username, payload.password));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  if (!token) {
    throw Unauthorized('Invalid user or password');
  }

  return JSON.stringify({ token });
};
