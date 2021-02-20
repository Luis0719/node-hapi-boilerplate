const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const { getRoleById } = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAs } = helpers.response;

module.exports = async ({ logger, params }) => {
  const [error, role] = await to(getRoleById({ id: params.id }));

  if (error) {
    logger.error(error);
    throw internal();
  }

  return representAs('role')(role);
};
