
const basicToken = require('./basic-token');
const JWTService = require('./jwt');

module.exports = async (server) => {
  await server.register(require('hapi-auth-bearer-token'));
  server.auth.strategy('basicToken', 'bearer-access-token', basicToken);

  await server.register(require('hapi-jsonwebtoken').plugin);
  server.auth.strategy('jwt', 'hapi-jsonwebtoken', JWTService);

  server.auth.default('basicToken');
}
