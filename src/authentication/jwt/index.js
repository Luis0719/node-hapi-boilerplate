const { DateTime } = require('luxon');
const { jwt } = require('config');
const { httpErrors } = require('common').helpers;
const { getUserById } = require('../../services/users/methods');
const userHasPermission = require('./userHasPermission');

const { Unauthorized } = httpErrors;

const authorizedCredentials = credentials => ({ isValid: true, credentials });
const isTokenExpired = expiresAt =>
  DateTime.fromISO(expiresAt) < DateTime.local();

module.exports = {
  secretOrPrivateKey: jwt.secretOrPrivateKey,
  getToken: request => {
    return request.headers.authorization;
  },
  validate: async (request, payload, h) => {
    if (!payload.id) {
      throw Unauthorized('Invalid authorization key');
    }

    if (isTokenExpired(payload.expiresAt)) {
      throw Unauthorized('Expired token');
    }

    const user = await getUserById(payload.id, { raw: true });

    if (!user || !(await userHasPermission(request, user))) {
      throw Unauthorized();
    }

    // Avoid saving the password in the auth object. It might be a security good practice?
    delete user.password;
    return authorizedCredentials(user);
  },
};
