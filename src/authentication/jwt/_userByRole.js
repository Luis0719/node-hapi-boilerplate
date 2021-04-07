const _ = require('lodash');
const { jwtBaseStrategy, authorizedResponse, unauthorizedResponse} = require('./base');
const { getUserWithRolesAndActions } = require('./getUser');

const hasAdminRole = (roles) => {
  return !!_.find(roles, { name: 'admin' });
}

const roleHasPermission = (roles, route) => {
  const { path, method } = route;

  for (const role of roles) {
    if (_.find(role.actions, { method, path })) return true;
  }

  return false;
}
/*
  This strategy focuses on whether a user's role has the permission to
  access a specific resource. The 'resource' is the combination of the
  url (a.k.a. path) and the method found in the request. Note that if the
  user has the 'admin' role is will be allowed by default.

  @param (Request)
  @param (Payload) decripted jwt, which is an object containing the userId
  @return authorizedResponse | unauthorizedResponse
 */
const hasPermission = async (request, payload) => {
  const user = await getUserWithRolesAndActions(payload.id);

  if (!user)
    return unauthorizedResponse();

  const roles = user.roles;
  if (hasAdminRole(roles)) {
    return authorizedResponse(user);
  }

  return roleHasPermission(roles, request.route)
    ? authorizedResponse(user)
    : unauthorizedResponse();
}

module.exports = {
  hasPermission,
  validate: jwtBaseStrategy('userByRole', hasPermission),
}
