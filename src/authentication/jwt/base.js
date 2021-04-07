const _ = require('lodash');
const { jwt } = require('config');
const { unauthorized } = require('@hapi/boom');

// Expected response from 'hasPermission' functions
const unauthorizedResponse = () => ({ authorized: false });
const authorizedResponse = (user) => ({
  authorized: true,
  user,
});
// ---------------------------------------

const validCredentials = (credentials) => ({ isValid: true, credentials });
/*
  Generic JWT method to be reused by other strategies
  @param name of the jwt strategy that is extending this functionality
  @param (Promise(request: Request, payload: {id: MongoObjectId}) -> {valid: Boolean, user: User})
    function to determine if the user has permission to access the resource
 */
const jwtBaseStrategy = (name, hasPermission) => {
  if (!jwt.secretKey || !jwt.verify) {
    console.log('JWT verify:', jwt.verify);
    throw new Error('Wrong configuration for jwt strategy');
  }

  if (!_.isFunction(hasPermission)) {
    throw new Error(
      `Error for JWT ${name}. 'hasPermission' must be a function. Instead got ${typeof hasPermission}`
    );
  }

  return {
    keys: jwt.secretKey,
    verify: jwt.verify,
    validate: async (artifacts, request) => {
      const payload = artifacts.decoded.payload;

      if (!payload.id) {
        throw unauthorized('Invalid authorization key');
      }

      const hasPermissionResult = await hasPermission(request, payload);
      if (!hasPermissionResult.authorized) {
        throw unauthorized('User not authorized');
      }

      return validCredentials(hasPermissionResult.user);
    },
  };
};

module.exports = {
  authorizedResponse,
  unauthorizedResponse,
  jwtBaseStrategy,
};
