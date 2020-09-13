const services = ['auth', 'users', 'roles'];

module.exports = (serviceID, logger) => {
  const buildServicePlugin = (service, version = 'v1') => ({
    plugin: require(`../services/${service}`),
    options: { logger, serviceName: serviceID.name },
    routes: {
      prefix: `/api/${version}/${service}`,
    },
  });

  return [
    require('@hapi/inert'),
    require('@hapi/vision'),
    require('./swagger'),
    {
      plugin: require('./logging'),
      options: { logger, serviceName: serviceID.name },
    },
  ].concat(services.map(service => buildServicePlugin(service)));
};
