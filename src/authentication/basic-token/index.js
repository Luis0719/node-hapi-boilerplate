const { apiService } = require('config');

module.exports = {
  accessTokenName: apiService.accessTokenName,
  allowQueryToken: apiService.allowQueryToken,
  validate: async (request, token, h) => {
    const isValid = token === apiService.accessToken;

    const credentials = { token };
    const artifacts = {};

    return { isValid, credentials, artifacts };
  }
}