const {
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAs },
  },
} = require('common');
const { getRoleById } = require('../methods');

module.exports = async ({ plugins, params }) => {
  const { logger } = plugins;

  const [error, role] = await to(getRoleById(params.id));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  logger.info(role);

  return representAs('role')(role);
};
