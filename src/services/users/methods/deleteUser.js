const getUserById = require('./getUserById');

module.exports = async id => {
  const user = await getUserById(id);

  if (!user) {
    return null;
  }

  return user.destroy();
};
