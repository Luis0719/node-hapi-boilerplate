const P = require('bluebird');
const { ActionGroup } = require('common').db.models;

const seed = async ({users_actions, roles_actions}) => {
  const users_group = new ActionGroup({
    name: 'Usuarios',
    description: '',
    actions: users_actions.map(action => action.id),
  });

  const roles_group = new ActionGroup({
    name: 'Roles',
    description: '',
    actions: roles_actions.map(action => action.id),
  });

  await P.all([
    users_group.save(),
    roles_group.save(),
  ]);

  return {
    users_group,
    roles_group,
  }
}

module.exports = {
  seed,
}
