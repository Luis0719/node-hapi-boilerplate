const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const { getUsers } = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAsPaginated } = helpers.response;

module.exports = async ({ logger, query }) => {
  const [error, users] = await to(getUsers(query));

  if (error) {
    logger.error(error);
    throw internal();
  }

  return representAsPaginated('user')(users);
};
