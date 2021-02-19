const _ = require('lodash');

module.exports = {
  name: 'pino-logger',
  version: '1.0.0',
  plugin: require('hapi-pino'),
  options: {
    prettyPrint: process.env.NODE_ENV !== 'production',
    redact:
      process.env.NODE_ENV === 'production'
        ? ['req.headers.authorization']
        : [], // Protect sensitive data
    logPayload: process.env.NODE_ENV !== 'production',
    logQueryParams: true,
    logRequestStart: true,
    logRequestComplete: true,
    serializers: {
      req: (req) => ({
        url: `${req.method} ${req.url}`,
        // headers: _.omit(req.headers, ['postman-token']),
        headers: _.pick(req.headers, ['authorization', 'host']),
      }),
      res: (res) => ({
        code: res.statusCode,
      }),
    },
  },
};
