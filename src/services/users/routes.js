const Joi = require('joi');
const handlers = require('./handlers');

module.exports = () => [
  {
    method: 'GET',
    path: '/users',
    handler: handlers.getUsers,
    config: {
      tags: ['api', 'users'],
      description: 'Get list of all users',
      auth: 'adminOnly',
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (request) => handlers.getUser(request),
    config: {
      tags: ['api', 'users'],
      description: 'Get user by id',
      auth: 'adminOnly',
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
      auth: 'userByRole',
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
    handler: handlers.updateUser,
    config: {
      tags: ['api', 'users'],
      description: 'Update user by id',
      auth: 'userByRole',
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
    handler: handlers.setEmail,
    config: {
      tags: ['api', 'users'],
      description: 'Update user email by id',
      auth: 'userByRole',
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
    handler: handlers.resetPassword,
    config: {
      tags: ['api', 'users'],
      description: 'Update user password by id',
      auth: 'userByRole',
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
    handler: handlers.deleteUser,
    config: {
      tags: ['api', 'users'],
      description: 'Delete user by id',
      auth: 'userByRole',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
      },
    },
  },
];
