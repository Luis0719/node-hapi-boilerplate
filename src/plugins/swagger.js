module.exports = {
  name: 'swagger',
  version: '1.0.0',
  plugin: require('hapi-swagger'),
  options: {
    documentationPath: '/documentation',
    swaggerUIPath: '/v1/swaggerui/',
    jsonPath: '/v1/swagger.json',
    info: {
      title: 'Fox-admin API',
    },
  },
}