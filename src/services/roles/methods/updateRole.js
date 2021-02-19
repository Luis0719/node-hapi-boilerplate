const { map, groupBy } = require('lodash');
const P = require('bluebird');
const { db } = require('common');
const { RoleActions } = db.models;
const getRoleById = require('./getRoleById');

const deleteActions = async (role, actions) => {
  if (actions.length === 0) return;

  const actionIds = map(actions, 'action_id');
  return RoleActions.destroy({
    where: {
      role,
      action_id: actionIds,
    },
    force: true, // Hard delete to keep db clean
  });
};

const assignActions = async (role, actions) => {
  if (actions.length === 0) return;

  const actionIds = map(actions, 'action_id');
  return P.map(actionIds, async (action_id) =>
    RoleActions.create({
      role,
      action_id,
    })
  );
};

module.exports = async (id, payload) => {
  const role = await getRoleById(id);

  if (!role) {
    return null;
  }

  if (payload.name) {
    await role.update(payload);
  }

  // Actions is an array of objects. Each object should a 'type' and 'action_id' keys.
  // There are 2 possible 'types':
  //    1.- create --> should assign a new action to this role
  //    2.- delete --> should delete an existing action for this role
  if (payload.actions) {
    const actionsByType = groupBy(payload.actions, 'type');

    await deleteActions(role.name, actionsByType['delete']);
    await assignActions(role.name, actionsByType['create']);
  }

  return role.reload();
};
