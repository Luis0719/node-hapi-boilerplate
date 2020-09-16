const pkg = require('../package.json');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return {
        service: pkg.name,
        version: pkg.version,
      };
    },
    config: {},
  },
  {
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
      return '404 Error! Page Not Found!';
    },
  },
];
