const { apiService } = require('config');
const { internal } = require('@hapi/boom');

module.exports = (tokenConfig) => {
  if (!tokenConfig.accessToken) {
    console.log(`${tokenConfig.accessTokenName} Token is not defined`); // eslint-disable-line no-console
    throw internal();
  }

  return {
    accessTokenName: tokenConfig.accessTokenName,
    allowQueryToken: tokenConfig.allowQueryToken,
    validate: async ({ logger }, token) => {
      const isValid = token === apiService.accessToken;

      const credentials = { token };
      const artifacts = {};

      return { isValid, credentials, artifacts };
    },
  };
};
