module.exports = serviceID =>
  [
    require('@hapi/inert'),
    require('@hapi/vision'),
    require('./swagger'),
    require('./logging'),
  ].concat(require('./api')(serviceID));
