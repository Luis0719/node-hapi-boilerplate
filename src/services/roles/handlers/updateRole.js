const {
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAs },
  },
} = require('common');
const { updateRole } = require('../methods');

module.exports = async ({ plugins, params, payload }) => {
  const { logger } = plugins;

  const [error, updatedRole] = await to(updateRole(params.id, payload));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return representAs('role')(updatedRole);
};
