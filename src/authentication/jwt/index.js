const { jwt } = require('config');
const { httpErrors } = require('common').helpers;
const { getUserById } = require('../../services/users/methods');
const userHasPermission = require('./userHasPermission');

const { Unauthorized } = httpErrors;

const authorizedCredentials = (credentials) => ({ isValid: true, credentials });
const unauthorizedCredentials = () => ({ isValid: false });

module.exports = {
  keys: jwt.secretKey,
  verify: jwt.verify,
  validate: async (artifacts, request) => {
    const payload = artifacts.decoded.payload;

    if (!payload.id) {
      throw Unauthorized('Invalid authorization key');
    }

    const user = await getUserById({
      id: payload.id,
      attributes: ['first_name', 'last_name', 'roles', 'created_at'],
      options: {
        lean: true,
        populate: {
          path: 'roles',
          select: ['id', 'name', 'actions'],
          populate: {
            path: 'actions',
            select: ['id', 'path', 'method'],
          },
        },
      },
    });

    if (!user || !(await userHasPermission(request, user))) {
      throw Unauthorized('User not authorized');
    }

    return authorizedCredentials(user);
  },
};
