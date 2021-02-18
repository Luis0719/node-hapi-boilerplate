const Joi = require('joi');
const handlers = require('./handlers');

module.exports = () => [
  {
    method: 'POST',
    path: '/auth/login',
    handler: request => handlers.login(request),
    config: {
      tags: ['api', 'auth'],
      description: 'Authenticate user and return JWT',
      auth: 'basicToken',
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
    path: '/auth/decode',
    handler: request => handlers.decode(request),
    config: {
      auth: 'jwt',
      tags: ['api', 'auth'],
      description: 'Decode JWT',
    },
  },
];
