const { db } = require('common');
const { RoleActions, Actions } = db.models;

module.exports = async (request, user) => {
  const roles = user.roles;
  const requestInfo = request.route;

  if (roles.includes('admin')) {
    return true;
  }

  const roleAction = await RoleActions.findOne({
    attributes: ['id'],
    where: {
      role: roles,
    },
    include: {
      model: Actions,
      attributes: ['id'],
      where: {
        uri: requestInfo.path,
        method: requestInfo.method,
      },
      required: true,
    },
  });

  return !!roleAction;
};
