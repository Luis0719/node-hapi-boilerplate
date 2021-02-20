const { db } = require('common');
const { User } = db.models;

module.exports = async (data) => {
  const user = new User(data);

  return user.save();
};
