const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const { storeUser } = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAs } = helpers.response;

module.exports = async ({ logger, payload }) => {
  const [error, user] = await to(storeUser(payload));

  if (error) {
    logger.error(error);
    throw internal();
  }

  return representAs('user')(user);
};
