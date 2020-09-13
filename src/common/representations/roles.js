module.exports = {
  init: J => {
    J.define('role', [
      J.Field('id'),
      J.Field('name'),
      J.Field('createdAt'),
      J.Field('updatedAt'),
    ]);
  },
};
