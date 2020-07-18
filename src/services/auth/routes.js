const Joi = require('joi');
const methods = require('./methods');

const {
  login,
  decode
} = require('./handlers');

module.exports = () => [
  {
    method: 'POST',
    path: '/auth/login',
    handler: request => login(request, methods),
    config: {
      tags: ['api', 'auth'],
      description: 'Authenticate user and return JWT',
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required()
        })
      }
    }
  },{
    method: 'GET',
    path: '/auth/decode',
    handler: request => decode(request),
    config: {
      tags: ['api', 'auth'],
      description: 'Decode JWT',
      auth: 'jwt'
    }
  },
]