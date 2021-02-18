const getUserById = require('./getUserById');

module.exports = async (id, data) => {
  const user = await getUserById({ id });

  if (!user) {
    return null;
  }

  Object.assign(user, data);

  return user.save();
};
