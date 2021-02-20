const getUserById = require('./getUserById');

module.exports = async (id, email) => {
  const user = await getUserById({ id });

  if (!user) return null;

  user.email = email;
  return user.save();
};
