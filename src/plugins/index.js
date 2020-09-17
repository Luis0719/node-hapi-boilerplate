module.exports = serviceID => {
  let plugins = [
    require('@hapi/inert'),
    require('@hapi/vision'),
    require('./swagger'),
    ...require('./api')(serviceID),
  ];

  if (process.env.APP_ENV !== 'test') {
    plugins = [...plugins, require('./logging')]; // Disable certain plugins when testing
  }

  return plugins;
};
