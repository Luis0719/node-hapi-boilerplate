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
    method: 'get',
    path: '/{id}',
    handler: request => handlers.getRole(request),
    config: {
      tags: ['api', 'roles'],
      description: 'Get role by ID',
      auth: 'jwt',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
      },
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
  {
    method: 'delete',
    path: '/{id}',
    handler: request => handlers.deleteRole(request),
    config: {
      tags: ['api', 'roles'],
      description: 'Delete role',
      auth: 'jwt',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
      },
    },
  },
];
