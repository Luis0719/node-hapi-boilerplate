const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const { deleteRole } = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAs } = helpers.response;

module.exports = async ({ logger, params }) => {
  const [error, deletedRole] = await to(deleteRole(params.id));

  if (error) {
    logger.error(error);
    throw internal();
  }

  return representAs('role')(deletedRole);
};
