const { apiService } = require('config');
const { helpers } = require('common');

const { InternalServer } = helpers.httpErrors;

module.exports = (tokenConfig) => {
  if (!tokenConfig.accessToken)
    throw InternalServer(
      `${tokenConfig.accessTokenName} Token is not defined`,
      'Basic',
      true
    );

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
