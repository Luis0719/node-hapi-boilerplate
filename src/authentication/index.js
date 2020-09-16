const basicToken = require('./basic-token');
const JWTService = require('./jwt');
const anyOne = require('./any-one');

module.exports = async server => {
  server.auth.scheme('anyOneScheme', anyOne.scheme);
  server.auth.strategy('anyOne', 'anyOneScheme', anyOne.validate);

  await server.register(require('hapi-auth-bearer-token'));
  server.auth.strategy('basicToken', 'bearer-access-token', basicToken);

  await server.register(require('hapi-jsonwebtoken').plugin);
  server.auth.strategy('jwt', 'hapi-jsonwebtoken', JWTService);
};
