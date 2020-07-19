const moment = require('moment');
const { jwt } = require("config");
const { httpErrors } = require('common');
const { getUserById } = require('../../services/users/methods');

const { Unauthorized } = httpErrors;

const authorizedCredentials = (credentials) => ({ isValid: true, credentials });
const isTokenExpired = (expiresAt) => moment(expiresAt) < moment();

module.exports = {
  secretOrPrivateKey: jwt.secretOrPrivateKey,
  getToken: (request) => {
    return request.headers.authorization;
  },
  validate: async (request, payload, h) => { 
    if (!payload.id) {
      throw Unauthorized('Invalid authorization key');
    }

    if (isTokenExpired(payload.expiresAt)) {
      throw Unauthorized('Expired token');
    }

    const user = await getUserById(payload.id);

    if (user) {
      // Avoid saving the password in the auth object. It might be a security good practice?
      delete user.password;
      user.scope = user.roles;
      return authorizedCredentials(user);
    }

    throw Unauthorized()    
  }
};