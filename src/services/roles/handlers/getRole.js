const {
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAs },
  },
} = require('common');
const { getRoleById } = require('../methods');

module.exports = async ({ logger, params }) => {
  const [error, role] = await to(getRoleById(params.id));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return representAs('role')(role);
};
