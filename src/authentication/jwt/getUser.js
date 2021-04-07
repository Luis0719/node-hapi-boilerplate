const { User } = require('common').db.models;

const getUser = (userId) =>
  User.findById(
    userId,
    ['first_name', 'last_name', 'roles', 'created_at'],
    {
      lean: true
    },
  );

const getUserWithRoles = (userId) =>
  User.findWithRoles(
    userId,
    {
      user: ['first_name', 'last_name', 'roles', 'created_at'],
      roles: ['id', 'name', 'actions'],
    },
    true
  );

const getUserWithRolesAndActions = (userId) =>
  User.findWithRolesAndActions(
    userId,
    {
      user: ['first_name', 'last_name', 'roles', 'created_at'],
      roles: ['id', 'name', 'actions'],
      actions: ['id', 'path', 'method'],
    },
    true
  );

module.exports = {
  getUser,
  getUserWithRoles,
  getUserWithRolesAndActions,
}
