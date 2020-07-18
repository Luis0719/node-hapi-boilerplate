const { jwt } = require("../../../config");
const { httpErrors } = require('../../helpers');
const { getUserById } = require('../../services/auth/methods');

const { Unauthorized } = httpErrors;

const authorizedCredentials = (credentials) => ({ isValid: true, credentials });

module.exports = {
  secretOrPrivateKey: jwt.secretOrPrivateKey,
  getToken: (request) => {
    return request.headers.authorization;
  },
  validate: async (request, payload, h) => {      
    if (!payload.id) {
      throw Unauthorized('Invalid authorization key');
    }

    const user = await getUserById(payload.id);

    if (user) {
      // Avoid saving the password in the auth object. It might be a security good practice?
      delete user.dataValues["password"];
      return authorizedCredentials(user);
    }

    throw Unauthorized()    
  }
};