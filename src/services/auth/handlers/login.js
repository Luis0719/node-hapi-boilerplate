const { helpers } = require('common');
const { internal, unauthorized } = require('@hapi/boom');
const { login } = require('../methods');

const { to } = helpers.functionalHelpers;

module.exports = async ({ logger, payload }) => {
  const [error, token] = await to(login(payload.username, payload.password));

  if (error) {
    logger.error(error);
    throw internal();
  }

  if (!token) {
    throw unauthorized('Invalid user or password');
  }

  return JSON.stringify({ token });
};
