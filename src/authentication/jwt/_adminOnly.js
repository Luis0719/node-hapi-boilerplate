const { jwtBaseStrategy, authorizedResponse, unauthorizedResponse} = require('./base');
const { getUserWithRoles } = require('./getUser');

const hasAdminRole = (roles) => {
  return !!_.find(roles, { name: 'admin' });
}

/*
  This strategy focuses on only allowing admin users

  @param (Request)
  @param (Payload) decripted jwt, which is an object containing the userId
  @return authorizedResponse | unauthorizedResponse
 */
const hasPermission = async (request, payload) => {
  const user = await getUserWithRoles(payload.id);

  if (!user)
    return unauthorizedResponse();

  return hasAdminRole(roles)
    ? authorizedResponse(user)
    : unauthorizedResponse();
}

module.exports = jwtBaseStrategy(hasPermission);
