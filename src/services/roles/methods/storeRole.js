const P = require('bluebird');
const { db } = require('common');
const { Roles, RoleActions } = db.models;

module.exports = async (data) => {
  const role = await Roles.create(data);

  await P.map(data.actions, async (action) =>
    RoleActions.create({
      role: role.name,
      action_id: action,
    })
  );

  return role;
};
