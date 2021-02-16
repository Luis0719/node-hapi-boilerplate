const pkg = require('../../package.json');

module.exports = {
  name: 'swagger',
  version: '1.0.0',
  plugin: require('hapi-swagger'),
  options: {
    documentationPath: '/documentation',
    info: {
      title: 'API',
      version: pkg.version,
    },
    basePath: '/api',
    grouping: 'tags',
  },
};
