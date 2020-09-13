const { db } = require('common');
const { Roles, RoleActions } = db.models;

module.exports = (id, options) =>
  Roles.findByPk(id, {
    ...options,
    include: [
      {
        model: RoleActions,
        attributes: ['id', 'action_id'],
      },
    ],
  });
