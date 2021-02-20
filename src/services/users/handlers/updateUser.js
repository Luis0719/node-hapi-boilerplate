const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const { updateUser } = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAs } = helpers.response;

module.exports = async ({ logger, params, payload }) => {
  const [error, user] = await to(updateUser(params.id, payload));

  if (error) {
    logger.error(error);
    throw internal();
  }

  if (!user) {
    throw NotFound();
  }

  return representAs('user')(user);
};
