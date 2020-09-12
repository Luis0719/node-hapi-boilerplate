module.exports = (serviceID, logger) => [
  require('@hapi/inert'),
  require('@hapi/vision'),
  require('./swagger'),
  {
    plugin: require('./logging'),
    options: { logger, serviceName: serviceID.name },
  },
  {
    plugin: require('../services/auth'),
    options: { logger, serviceName: serviceID.name },
    routes: {
      prefix: '/api/v1/auth',
    },
  },
  {
    plugin: require('../services/users'),
    options: { logger, serviceName: serviceID.name },
    routes: {
      prefix: '/api/v1/users',
    },
  },
];
