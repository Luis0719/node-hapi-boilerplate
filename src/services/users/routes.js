const Joi = require('joi');
const methods = require('./methods');

const {
  list
} = require('./handlers');

module.exports = () => [
  {
    method: 'GET',
    path: '/users',
    handler: request => list(request, methods),
    config: {
      tags: ['api', 'users'],
      description: 'Get list of all users',
      auth: 'jwt',
      validate: {}
    }
  }
]