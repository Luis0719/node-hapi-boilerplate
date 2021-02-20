const { badRequest } = require('@hapi/boom');

module.exports = async (request, h, err) => {
  const validationError = err.details[0];
  const field = validationError.path.join('.');

  const { type, message } = validationError;

  switch (type) {
    case 'object.base':
      if (!field)
        throw badRequest('Payload cannot be empty and must be an object');

      throw badRequest(`Param ${field} must be an object`);
    default:
      throw badRequest(message.replace(/"/g, ''));
  }
};
