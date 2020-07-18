const Hapi = require('@hapi/hapi');

module.exports = async ({config = {}, routes = {}, plugins = {}}) => {
  // Creates server instance
  const server = new Hapi.Server(config);

  // Load authentication strategies
  await require('./authentication')(server);

  // Loads routes and plugins
  await server.register(plugins);

  server.route(routes);

  return server;
}