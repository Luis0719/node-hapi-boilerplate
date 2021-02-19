const config = require('config');

const basicToken = require('./basic-token');
const JWTService = require('./jwt');

module.exports = async (server) => {
  await server.register(require('hapi-auth-bearer-token'));
  server.auth.strategy(
    'basicToken',
    'bearer-access-token',
    basicToken(config.apiService)
  );

  await server.register(require('@hapi/jwt'));
  server.auth.strategy('jwt', 'jwt', JWTService);
};
