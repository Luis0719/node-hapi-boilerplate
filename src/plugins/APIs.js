const services = ['auth', 'users', 'roles'];

module.exports = () => {
  const buildServicePlugin = service => ({
    plugin: require(`../services/${service}`),
    routes: {
      prefix: `/api/v1/${service}`,
    },
  });

  return services.map(buildServicePlugin);
};
