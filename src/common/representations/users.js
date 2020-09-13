module.exports = {
  init: J => {
    J.define('user', [
      J.Field('id'),
      J.Field('first_name'),
      J.Field('last_name'),
      J.Field('image'),
      J.Field('email'),
      J.Field('phone'),
      J.Field('roles'),
      J.Field('createdAt'),
      J.Field('updatedAt'),
    ]);
  },
};
