module.exports = {
  name: 'pino-logger',
  version: '1.0.0',
  plugin: require('hapi-pino'),
  options: {
    prettyPrint: process.env.NODE_ENV !== 'production',
    redact: ['req.headers.authorization'], // Protect sensitive data
    serializers: {
      req: req => ({
        url: `${req.method.toUpperCase()} ${req.url}`,
        headers: req.headers,
      }),
      res: res => res.statusCode,
    },
  },
};
