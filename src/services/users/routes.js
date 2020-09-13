const Joi = require('joi');
const handlers = require('./handlers');

module.exports = () => [
  {
    method: 'GET',
    path: '/',
    handler: request => handlers.getUsers(request),
    config: {
      tags: ['api', 'users'],
      description: 'Get list of all users',
      auth: 'jwt',
      plugins: {
        'hapi-swagger': {
          security: [{ 'API Key': {} }],
          payloadType: 'form',
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: request => handlers.getUser(request),
    config: {
      tags: ['api', 'users'],
      description: 'Get user by id',
      auth: 'jwt',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/',
    handler: request => handlers.storeUser(request),
    config: {
      tags: ['api', 'users'],
      description: 'Store new user',
      auth: 'jwt',
      validate: {
        payload: Joi.object({
          first_name: Joi.string().max(60).required(),
          last_name: Joi.string().max(60).required(),
          image: Joi.string(),
          username: Joi.string().required(),
          password: Joi.string().required(),
          email: Joi.string()
            .max(50)
            .email({ tlds: { allow: false } }),
          phone: Joi.string(),
          roles: Joi.array().items(Joi.string()),
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/{id}',
    handler: request => handlers.updateUser(request),
    config: {
      tags: ['api', 'users'],
      description: 'Update user by id',
      auth: 'jwt',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
        payload: Joi.object({
          first_name: Joi.string().max(60).required(),
          last_name: Joi.string().max(60).required(),
          image: Joi.string(),
          username: Joi.string().required(),
          email: Joi.string()
            .max(50)
            .email({ tlds: { allow: false } }),
          phone: Joi.string(),
          roles: Joi.array().items(Joi.string()),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/{id}',
    handler: request => handlers.deleteUser(request),
    config: {
      tags: ['api', 'users'],
      description: 'Delete user by id',
      auth: 'jwt',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
      },
    },
  },
];
