const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const { updateRole } = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAs } = helpers.response;

module.exports = async ({ logger, params, payload }) => {
  const [error, updatedRole] = await to(updateRole(params.id, payload));

  if (error) {
    logger.error(error);
    throw internal();
  }

  return representAs('role')(updatedRole);
};
