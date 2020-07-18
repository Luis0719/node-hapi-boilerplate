const boom = require('@hapi/boom');
const { server } = require('config');

const { flip, concat, replace, compose, prop } = require('ramda');

const appendError = flip(concat)('Error');
const removeSpaces = replace(/ /g, '');
const getBoomError = compose(prop('error'), prop('payload'), prop('output'));
const createErrorCode = compose(appendError, removeSpaces, getBoomError);

const extendWithErrorCode = (originalError, customError) => (
  message,
  scheme = 'Basic',
  debug = server.debug,
) => {
  const originalErrorInstance = originalError(message, scheme);
  if (customError) originalErrorInstance.output.payload.error = customError;
  originalErrorInstance.output.payload.code = createErrorCode(
    originalErrorInstance,
  );
  if (
    debug &&
    message &&
    message != originalErrorInstance.output.payload.message
  ) {
    originalErrorInstance.message = message;
    originalErrorInstance.reformat(true);
  }
  return originalErrorInstance;
};

const BadRequest = extendWithErrorCode(boom.badRequest);
const NotFound = extendWithErrorCode(boom.notFound);
const InternalServer = extendWithErrorCode(boom.internal, 'Internal');
const Unauthorized = extendWithErrorCode(boom.unauthorized);

module.exports = {
  BadRequest,
  NotFound,
  InternalServer,
  Unauthorized,
};
