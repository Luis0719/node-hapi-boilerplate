const { jwt: config } = require('config');
const Jwt = require('@hapi/jwt');
const { utils } = require('common');
const { bcrypt } = utils;
const getUser = require('./getUser');

module.exports = async (username, password) => {

  const user = await getUser(username);
  if (!user) {
    return false;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return false;
  }

  return Jwt.token.generate({
    id: user.id,
  }, {
    key: config.secretKey
  });
};
