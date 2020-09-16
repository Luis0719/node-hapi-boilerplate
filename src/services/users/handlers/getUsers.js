const {
  helpers: {
    httpErrors: { InternalServer },
    functionalHelpers: { to },
    response: { representAsPaginated },
    sequelize: { buildSequelizeOptions },
  },
} = require('common');
const { buildFilterCondition, getUsers } = require('../methods');

module.exports = async ({ logger, query }) => {
  const options = buildSequelizeOptions(query);
  options.where = buildFilterCondition(query);

  const [error, users] = await to(getUsers(options));

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  return representAsPaginated('user')(users);
};
