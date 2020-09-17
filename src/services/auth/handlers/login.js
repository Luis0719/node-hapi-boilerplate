const { helpers } = require('common');
const { InternalServer, Unauthorized } = helpers.httpErrors;
const { to } = helpers.functionalHelpers;

const { login } = require('../methods');

module.exports = async ({ logger, payload, server }) => {
  const tokenizer = server.methods.jwtSign;

  const [error, token] = await to(
    login(tokenizer, payload.username, payload.password)
  );

  if (error) {
    logger.error(error);
    throw InternalServer();
  }

  if (!token) {
    throw Unauthorized('Usuario o contraseña incorrectos');
  }

  return JSON.stringify({ token });
};
