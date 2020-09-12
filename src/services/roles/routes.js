const Joi = require('joi');
const handlers = require('./handlers');

module.exports = () => [
  {
    method: 'get',
    path: '/',
    handler: request => handlers.getRoles(request),
    config: {
      tags: ['api', 'roles'],
      descriptions: 'Get list of all roles',
      auth: 'jwt',
    },
  },
];
