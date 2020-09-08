const package = require('../../package.json');

module.exports = {
  name: 'swagger',
  version: '1.0.0',
  plugin: require('hapi-swagger'),
  options: {
    documentationPath: '/documentation',
    info: {
      title: 'Fox-admin API',
      version: package.version,
    },
    basePath: '/api',
    grouping: 'tags',
    securityDefinitions: {
      'API Key': {
        type: 'apiKey',    // apiKey is defined by the Swagger spec
        name: 'access_token',    // the name of the query parameter / header
        in: 'query'        // how the key is passed
      }
    }
  },
}