const {
  utils: { bcrypt },
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAs },
  },
} = require('common');
const { storeUser } = require('../methods');

module.exports = async ({ logger, payload }) => {
  const [error, user] = await to(storeUser(payload));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return representAs('user')(user);
};
