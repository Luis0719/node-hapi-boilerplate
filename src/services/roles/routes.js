const Joi = require('joi');
const handlers = require('./handlers');

module.exports = () => [
  {
    method: 'get',
    path: '/',
    handler: request => handlers.getRoles(request),
    config: {
      tags: ['api', 'roles'],
      description: 'Get list of all roles',
      auth: 'jwt',
    },
  },
  {
    method: 'post',
    path: '/',
    handler: request => handlers.storeRole(request),
    config: {
      tags: ['api', 'roles'],
      description: 'Create a new role',
      auth: 'jwt',
      validate: {
        payload: Joi.object({
          name: Joi.string().min(3).max(30).required(),
          actions: Joi.array().items(Joi.number().integer()).required(),
        }),
      },
    },
  },
];
