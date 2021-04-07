const { jwtBaseStrategy, authorizedResponse, unauthorizedResponse} = require('./base');
const { getUser } = require('./getUser');

/*
  This strategy focuses on only allowing admin users

  @param (Request)
  @param (Payload) decripted jwt, which is an object containing the userId
  @return authorizedResponse | unauthorizedResponse
 */
const hasPermission = async (request, payload) => {
  const user = await getUser(payload.id);

  return user
    ? authorizedResponse(user)
    : unauthorizedResponse();
}

module.exports = jwtBaseStrategy(hasPermission);
