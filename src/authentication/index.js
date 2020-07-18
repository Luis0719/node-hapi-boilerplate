
const basicTokenConfig = require('./basic-token');
const JWTConfig = require('./jwt');

module.exports = async (server) => {
  await server.register(require('hapi-auth-bearer-token'));
  server.auth.strategy('basicToken', 'bearer-access-token', basicTokenConfig);

  await server.register(require('hapi-jsonwebtoken').plugin);
  server.auth.strategy('jwt', 'hapi-jsonwebtoken', JWTConfig);

  server.auth.default('basicToken');
}