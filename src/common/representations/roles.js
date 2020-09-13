module.exports = {
  init: J => {
    J.define('role', [
      J.Field('id'),
      J.Field('name'),
      J.Field('createdAt'),
      J.Field('updatedAt'),
      J.Field('role_actions', {
        src: 'RoleActions',
        template: 'role_action',
      }),
    ]);

    J.define('role_action', [
      J.Field('id'),
      J.Field('role'),
      J.Field('action_id'),
      J.Field('createdAt'),
      J.Field('updatedAt'),
    ]);
  },
};
