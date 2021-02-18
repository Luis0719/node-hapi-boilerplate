module.exports = () => [
  require('@hapi/inert'),
  require('@hapi/vision'),
  require('./swagger'),
  require('./logging'),
  ...require('./APIs')(),
]
