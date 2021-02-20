const { jwt } = require('config');
const { db } = require('common');
const { unauthorized } = require('@hapi/boom');
const userHasPermission = require('./userHasPermission');

const { User } = db.models;

const authorizedCredentials = (credentials) => ({ isValid: true, credentials });

module.exports = {
  keys: jwt.secretKey,
  verify: jwt.verify,
  validate: async (artifacts, request) => {
    const payload = artifacts.decoded.payload;

    if (!payload.id) {
      throw unauthorized('Invalid authorization key');
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
      throw unauthorized('User not authorized');
    }

    return authorizedCredentials(user);
  },
};
