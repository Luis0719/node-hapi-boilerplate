module.exports = (serviceID, logger) => [
  require('@hapi/inert'),
  require('@hapi/vision'),
  require('./plugins/swagger'),
  {
    plugin: require('./plugins/logging'),
    options: {logger, serviceName: serviceID.name}
  },
  {
    plugin: require('./services/auth'),
    options: { logger, serviceName: serviceID.name }
  },
  {
    plugin: require('./services/users'),
    options: { logger, serviceName: serviceID.name }
  }
];