const {
  helpers: {
    httpErrors: { InternalServer, NotFound },
    functionalHelpers: { to },
    response: { representAs },
  },
} = require('common');
const { deleteUser } = require('../methods');

module.exports = async ({ logger, params }) => {
  const [error, user] = await to(deleteUser(params.id));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  if (!user) {
    throw NotFound();
  }

  return representAs('user')(user);
};
