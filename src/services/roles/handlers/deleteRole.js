const {
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAs },
  },
} = require('common');
const { deleteRole } = require('../methods');

module.exports = async ({ plugins, params }) => {
  const { logger } = plugins;

  const [error, deletedRole] = await to(deleteRole(params.id));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return representAs('role')(deletedRole);
};
