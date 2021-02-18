// const { db } = require('common');
// const { Actions } = db.models;

module.exports = async (request, user) => {
  const roles = user.roles;
  // const requestInfo = request.route;

  if (roles.includes('admin')) {
    return true;
  }

  const roleAction = true;
  return !!roleAction;
};
