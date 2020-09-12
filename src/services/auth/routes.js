const Joi = require('joi');
const handlers = require('./handlers');

module.exports = () => [
  {
    method: 'POST',
    path: '/login',
    handler: request => handlers.login(request),
    config: {
      tags: ['api', 'auth'],
      description: 'Authenticate user and return JWT',
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/decode',
    handler: request => handlers.decode(request),
    config: {
      tags: ['api', 'auth'],
      description: 'Decode JWT',
      auth: 'jwt',
    },
  },
];
