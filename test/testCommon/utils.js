const config = require('config');
const Jwt = require('@hapi/jwt');

/*
  Create a Jwt to authenticate requests
  @param userId {Int}
  @return Jwt {string}
 */
const buildJwtToken = (userId) => {
  return Jwt.token.generate(
    {
      id: userId,
    },
    {
      key: config.jwt.secretKey,
    }
  );
};

/*
  Create and object that contains the needed items to call a handler
  @Param query {Object}
  @Param params {Object}
  @Param payload {Object}
  @return {Object}
 */
const buildRequestBody = ({ query, params, payload }) => {
  return {
    query,
    params,
    payload,
    logger: {
      info: () => {},
      error: () => {},
      warn: () => {},
    },
  };
};

/*
  Create the headers needed to make a successful server.inject with basic token
 */
const buildAuthorizedHeaders = () => ({
  Authorization: `Bearer ${config.apiService.accessToken}`,
});

/*
  Create the headers needed to make a successful server.inject with jwt
 */
const buildAuthorizedJwtHeaders = (userId) => ({
  Authorization: `Bearer ${buildJwtToken(userId)}`,
});

/*
  Create headers that will always fail as unathorized
 */
const buildUnathorizedHeaders = () => ({
  Authorization: 'Bearer InvalidToken',
});

/*
  Create headers that will always fail as unathorized jwt
 */
const buildUnathorizedJwtHeaders = () => ({
  Authorization: `Bearer ${buildJwtToken(0)}`,
});

const buildServerInjecter = (server) => (route, headers, payload = {}) => {
  return server.inject({
    method: route.method,
    url: route.url,
    headers,
    payload,
  });
};

const toArrayOfIds = (models) => models.map((model) => model.id);

const getUrlWithPrefix = (url) => `/api/${url}`;

module.exports = {
  buildAuthorizedHeaders,
  buildAuthorizedJwtHeaders,
  buildJwtToken,
  buildRequestBody,
  buildUnathorizedHeaders,
  buildUnathorizedJwtHeaders,
  buildServerInjecter,
  getUrlWithPrefix,
  toArrayOfIds,
};
