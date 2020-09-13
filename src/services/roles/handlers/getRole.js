const {
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAs },
  },
} = require('common');
const { getRole } = require('../methods');

module.exports = async ({ plugins, params }) => {
  const { logger } = plugins;

  const [error, role] = await to(getRole(params.id));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  logger.info(role);

  return representAs('role')(role);
};
