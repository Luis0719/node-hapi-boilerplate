const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const methods = require('../methods');

const { to } = helpers.functionalHelpers;
const { noContent } = helpers.response;

module.exports = async ({ logger, params }, res) => {
  const [error, user] = await to(methods.deleteUser(params.id));

  if (error) {
    logger.error(error);
    throw internal();
  }

  if (!user) {
    logger.warn(`Could not delete user ${params.id}`);
  }

  return noContent(res);
};
