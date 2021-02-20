const Joi = require('joi');
const handlers = require('./handlers');

module.exports = () => [
  {
    method: 'GET',
    path: '/users',
    handler: (request) => handlers.getUsers(request),
    config: {
      tags: ['api', 'users'],
      description: 'Get list of all users',
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (request) => handlers.getUser(request),
    config: {
      tags: ['api', 'users'],
      description: 'Get user by id',
      auth: 'jwt',
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/users',
    handler: (request) => handlers.storeUser(request),
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
    path: '/users/{id}',
    handler: (request) => handlers.updateUser(request),
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
          phone: Joi.string(),
          roles: Joi.array().items(Joi.string()),
        }),
      },
    },
  },
  {
    method: 'PATCH',
    path: '/users/set-email/{id}',
    handler: (request) => handlers.setEmail(request),
    config: {
      tags: ['api', 'users'],
      description: 'Update user email by id',
      auth: 'jwt',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
        payload: Joi.object({
          email: Joi.string()
            .max(50)
            .email({ tlds: { allow: false } })
            .required(),
        }),
      },
    },
  },
  {
    method: 'PATCH',
    path: '/users/reset-password/{id}',
    handler: (request) => handlers.resetPassword(request),
    config: {
      tags: ['api', 'users'],
      description: 'Update user password by id',
      auth: 'jwt',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
        payload: Joi.object({
          password: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: (request) => handlers.deleteUser(request),
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
