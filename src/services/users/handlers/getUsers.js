const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const methods = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAsPaginated } = helpers.response;

module.exports = async ({ logger, query }) => {
  const [error, users] = await to(methods.getUsers(query));

  if (error) {
    logger.error(error);
    throw internal();
  }

  return representAsPaginated('user')(users);
};
