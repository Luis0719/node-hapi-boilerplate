const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const { storeRole } = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAs } = helpers.response;

module.exports = async ({ logger, payload }) => {
  const [error, role] = await to(storeRole(payload));

  if (error) {
    logger.error(error);
    throw internal();
  }

  return representAs('role')(role);
};
