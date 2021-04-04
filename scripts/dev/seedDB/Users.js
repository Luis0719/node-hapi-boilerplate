const P = require('bluebird');
const { User } = require('common').db.models;

const seed = async ({ admin_role, guest_role }) => {
  const admin_user = new User({first_name: 'admin', last_name: 'dpc', username: 'admin', roles: [admin_role.id]});
  await admin_user.setPassword('admin');

  const guest_user = new User({first_name: 'guest', last_name: 'dpc', username: 'guest', roles: [guest_role.id]});
  await guest_user.setPassword('guest');

  await P.all([
    admin_user.save(),
    guest_user.save(),
  ]);

  return {
    admin_user,
    guest_user,
  }
}

module.exports = {
  seed,
}

