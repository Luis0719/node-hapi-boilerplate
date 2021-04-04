const P = require('bluebird');
const { Role } = require('common').db.models;

const seed = async ({users_actions, roles_actions}) => {
  const admin_role = new Role({name: 'admin'});
  const guest_role = new Role({
    name: 'guest',
    actions: [
      users_actions[0],
      roles_actions[0],
    ]
  });

  await P.all([
    admin_role.save(),
    guest_role.save(),
  ]);

  return {
    admin_role,
    guest_role,
  }
}

module.exports = {
  seed,
}
