const { jwt } = require('config');
const { helpers, db } = require('common');
const { getUserById } = require('../../services/users/methods');
const userHasPermission = require('./userHasPermission');

const { User } = db.models;
const { Unauthorized } = helpers.httpErrors;

const authorizedCredentials = (credentials) => ({ isValid: true, credentials });

module.exports = {
  keys: jwt.secretKey,
  verify: jwt.verify,
  validate: async (artifacts, request) => {
    const payload = artifacts.decoded.payload;

    if (!payload.id) {
      throw Unauthorized('Invalid authorization key');
    }

    const user = await User.findWithRolesAndActions(
      payload.id,
      {
        user: ['first_name', 'last_name', 'roles', 'created_at'],
        roles: ['id', 'name', 'actions'],
        actions: ['id', 'path', 'method'],
      },
      true
    );

    if (!user || !(await userHasPermission(request, user))) {
      throw Unauthorized('User not authorized');
    }

    return authorizedCredentials(user);
  },
};
