const { helpers } = require('common');
const { setEmail } = require('../methods');
const { internal, notFound } = require('@hapi/boom');

const { to } = helpers.functionalHelpers;
const { representAs } = helpers.response;

module.exports = async ({ logger, params, payload }) => {
  const [error, user] = await to(setEmail(params.id, payload.email));

  if (error) {
    logger.error(error);
    throw internal();
  }

  if (!user) {
    throw notFound();
  }

  return representAs('user')(user);
};
