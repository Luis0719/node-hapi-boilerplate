const {
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAs },
  },
} = require('common');
const { storeRole } = require('../methods');

module.exports = async ({ logger, payload }) => {
  const [error, role] = await to(storeRole(payload));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return representAs('role')(role);
};
