const { db } = require('common');
const getRoleById = require('./getRoleById');

const { RoleActions } = db.models;

module.exports = async (id) => {
  const role = await getRoleById(id);

  if (!role) {
    return null;
  }

  await RoleActions.destroy({
    where: {
      role: role.name,
    },
    force: true, // Hard delete role actions to keep db clean
  });

  return role.destroy();
};
