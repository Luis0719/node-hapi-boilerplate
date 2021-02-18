const services = ['auth', 'users', 'roles'];

module.exports = () => {
  const buildServicePlugin = service => ({
    plugin: require(`../services/${service}`),
  });

  return services.map(buildServicePlugin);
};
