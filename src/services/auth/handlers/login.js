const moment = require('moment');
const { httpErrors, bcrypt } = require('common');
const { Unauthorized } = httpErrors;
const { jwt } = require('config');

module.exports = async (request, { getUser }) => {
  const { payload } = request;

  const user = await getUser({ username: payload.username });
  if(!user) {
    throw Unauthorized();
  }

  const validPassword = await bcrypt.compare(payload.password, user.password);
  if(!validPassword) {
    throw Unauthorized();
  }
  
  return request.server.methods.jwtSign({
    id: user.id,
    roles: user.roles,
    expiresAt: moment().add(jwt.ttl, 'milliseconds')
  });
}