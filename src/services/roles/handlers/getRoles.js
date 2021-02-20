const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const { getRoles, buildFilterCondition } = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAsPaginated } = helpers.response;

module.exports = async ({ logger, query }) => {
  const options = buildOptions(query);
  options.where = buildFilterCondition(query);

  const [error, roles] = await to(getRoles(options));

  if (error) {
    logger.error(error);
    throw internal();
  }

  return representAsPaginated('role')(roles);
};
