const P = require('bluebird');
const { Action } = require('common').db.models;

/*
  Build the route pattern for each action. This might be useful if we decide to use prefixes for every route
 */
const buildRoute = path => {
  return `/${path}`;
};

const seed = async () => {
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

module.exports = {
  seed,
}
