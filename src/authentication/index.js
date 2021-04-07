const config = require('config');

const basicToken = require('./basic-token');
const jwtAnyAuthenticated = require('./jwt/_anyAuthenticated').validate;
const jwtAdminOnly = require('./jwt/_adminOnly').validate;
const jwtUserByRole = require('./jwt/_userByRole').validate;

module.exports = async (server) => {
  await server.register(require('hapi-auth-bearer-token'));
  server.auth.strategy(
    'basicToken',
    'bearer-access-token',
    basicToken(config.apiService)
  );

  await server.register(require('@hapi/jwt'));
  server.auth.strategy('anyAuthenticated', 'jwt', jwtAnyAuthenticated);
  server.auth.strategy('adminOnly', 'jwt', jwtAdminOnly);
  server.auth.strategy('userByRole', 'jwt', jwtUserByRole);
};
