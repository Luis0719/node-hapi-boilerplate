const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const { deleteUser } = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAs } = helpers.response;

module.exports = async ({ logger, params }) => {
  const [error, user] = await to(deleteUser(params.id));

  if (error) {
    logger.error(error);
    throw internal();
  }

  if (!user) {
    throw NotFound();
  }

  return representAs('user')(user);
};
