const _ = require('lodash');

module.exports = async (request, user) => {
  const roles = user.roles;

  if (_.find(roles, {name: 'admin'} )) {
    return true;
  }

  const { path, method } = request.route;
  for (const role of roles) {
    if (_.find(role.actions, { method, path }))
      return true;
  }

  return false;
};
