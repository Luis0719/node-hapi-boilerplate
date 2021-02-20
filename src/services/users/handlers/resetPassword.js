const { helpers } = require('common');
const { resetPassword } = require('../methods');
const { internal, notFound } = require('@hapi/boom');

const { to } = helpers.functionalHelpers;

module.exports = async ({ logger, params, payload }) => {
  const [error, result] = await to(resetPassword(params.id, payload.password));

  if (error) {
    logger.error(error);
    throw internal();
  }

  if (!result) {
    throw notFound();
  }
}
