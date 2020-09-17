const services = ['auth', 'users', 'roles'];

module.exports = serviceID => {
  const buildServicePlugin = service => ({
    plugin: require(`../services/${service}`),
    options: { serviceName: serviceID.name },
    routes: {
      prefix: `/api/v1/${service}`,
    },
  });

  return services.map(buildServicePlugin);
};
