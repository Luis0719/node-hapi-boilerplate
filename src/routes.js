module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return 'Home'
    },
    config: {}
  },
  {
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
        return '404 Error! Page Not Found!';
    }
  }
];
