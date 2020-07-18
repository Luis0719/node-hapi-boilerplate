const { BadRequest } = require('common').httpErrors;

module.exports = async (request, h, err) => {
  const validationError = err.details[0];
  const field = validationError.path.join('.');

  const { type, message } = validationError;

  switch (type) {
    case 'object.base':
      if (!field)
        throw BadRequest('Payload cannot be empty and must be an object');

      throw BadRequest(`Param ${field} must be an object`);
    default:
      throw BadRequest(message.replace(/"/g, ''));
  }
};
