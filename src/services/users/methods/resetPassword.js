const {} = require('common');

const getUserById = require('./getUserById');

module.exports = async (id, password) => {
  const user = await getUserById(id);

  if (!user)
    return false;

  await user.setPassword(password);

  return true;
}
