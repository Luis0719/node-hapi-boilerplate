const routes = require('./routes');

module.exports = {
  name: 'roles',
  version: '1.0.0',
  register: async (server, options) => {
    server.route(routes({ server, options }));
  },
};
