const { db, helpers, utils } = require('common');

const { bcrypt } = utils;
const { InternalServer } = helpers.httpErrors;
const { to } = helpers.functionalHelpers;

const { Users } = db.models;

module.exports = async ({ plugins, payload }, reply) => {
  const { logger } = plugins;

  payload.password = await bcrypt.hash(payload.password);

  const [ error, user ] = await to(Users.create(payload));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return reply.response(user).code(201);
}
