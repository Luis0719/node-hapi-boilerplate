const P = require('bluebird');
const mongoose = require('mongoose');
const { db } = require('common');
const {
  Action,
  ActionGroup,
  Role,
  User,
} = db.models;

/*
  Drop all the records from all the collections
 */
const clean = async () => {
  for (const collection in mongoose.connection.collections) {
    await mongoose.connection.collections[collection].deleteMany( {});
  }
}

const seedActions = async () => {
  const buildRoute = path => {
    return `/${path}`;
  };

  const users_actions_data = [
    {
      path: buildRoute('users'),
      method: 'get',
      name: 'Ver usuarios',
      description: 'Ver lista de todos los usuarios',
    },
    {
      path: buildRoute('users/{id}'),
      method: 'get',
      name: 'Ver usuario',
      description: 'Ver detalles de un usuario',
    },
    {
      path: buildRoute('users/store'),
      method: 'post',
      name: 'Crear usuario',
      description: 'Crear nuevo usuario',
    },
    {
      path: buildRoute('users/update/{id}'),
      method: 'update',
      name: 'Editar usuario',
      description: 'Actualizar unformación de un usuario',
    },
    {
      path: buildRoute('users/delete/{id}'),
      method: 'delete',
      name: 'Eliminar usuario',
      description: 'Actualizar unformación de un usuario',
    },
  ];
  const roles_actions_data = [
    {
      path: buildRoute('roles'),
      method: 'get',
      name: 'Ver roles',
      description: 'Ver lista de todos los roles',
    },
    {
      path: buildRoute('roles/{id}'),
      method: 'get',
      name: 'Ver rol',
      description: 'Ver detalles de un rol',
    },
    {
      path: buildRoute('roles/store'),
      method: 'post',
      name: 'Crear rol',
      description: 'Crear nuevo rol',
    },
    {
      path: buildRoute('roles/update/{id}'),
      method: 'update',
      name: 'Editar rol',
      description: 'Actualizar unformación de un rol',
    },
    {
      path: buildRoute('roles/delete/{id}'),
      method: 'delete',
      name: 'Eliminar rol',
      description: 'Actualizar unformación de un rol',
    },
  ];

  const users_actions = users_actions_data.map(data => new Action(data));
  const roles_actions = roles_actions_data.map(data => new Action(data));

  await P.all([
    ...users_actions.map(action => action.save()),
    ...roles_actions.map(action => action.save()),
  ])

  return {
    users_actions,
    roles_actions,
  }
}

const seedActionGroups = async ({users_actions, roles_actions}) => {
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

const seedRoles = async ({users_actions, roles_actions}) => {
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

const seedUsers = async ({ admin_role, guest_role }) => {
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

const seed = async () => {
  db.connect();
  await clean();

  const actions = await seedActions();
  const roles = await seedRoles(actions);
  await seedUsers(roles);
  await seedActionGroups(actions);
}

return (async () => { await seed(); })();
