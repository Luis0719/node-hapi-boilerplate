const { jwt: config } = require('config');
const moment = require('moment');
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
    expiresAt: moment().add(config.ttl, 'milliseconds'),
  });
};
