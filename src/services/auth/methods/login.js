const { jwt: config } = require('config');
const { DateTime } = require('luxon');
const { utils } = require('common');
const { bcrypt } = utils;
const getUser = require('./getUser');

module.exports = async (tokenizer, username, password) => {
  const user = await getUser(username);
  if (!user) {
    return false;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return false;
  }

  return tokenizer({
    id: user.id,
    roles: user.roles,
    expiresAt: DateTime.local().plus({ seconds: config.ttl }),
  });
};
