const Joi = require('joi');
const handlers = require('./handlers');

module.exports = () => [
  {
    method: 'get',
    path: '/roles',
    handler: (request) => handlers.getRoles(request),
    config: {
      tags: ['api', 'roles'],
      description: 'Get list of all roles',
      // auth: 'jwt',
    },
  },
  {
    method: 'get',
    path: '/roles/{id}',
    handler: (request) => handlers.getRole(request),
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
    path: '/roles',
    handler: (request) => handlers.storeRole(request),
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
    method: 'put',
    path: '/roles/{id}',
    handler: (request) => handlers.updateRole(request),
    config: {
      tags: ['api', 'roles'],
      description: 'Update role',
      auth: 'jwt',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
        payload: Joi.object({
          name: Joi.string().min(3).max(30),
          actions: Joi.array().items(
            Joi.object({
              type: Joi.valid('create', 'delete'),
              action_id: Joi.number().integer(),
            })
          ),
        }),
      },
    },
  },
  {
    method: 'delete',
    path: '/roles/{id}',
    handler: (request) => handlers.deleteRole(request),
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
