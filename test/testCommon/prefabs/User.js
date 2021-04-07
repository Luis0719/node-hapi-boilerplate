const {
  Role,
} = require('common').db.models;

module.exports = (factories) => ({
  async createAdmin () {
    let admin_role = await Role.findOne({ name: 'admin' });

    if (!admin_role) {
      admin_role = await factories.Role.create({ name: 'admin' });
    }

    return factories.User.create({
      username: 'admin',
      roles: [admin_role.id],
    });
  },
  async createGuest () {
    let guest_role = await Role.findOne({ name: 'guest' });

    if (!guest_role) {
      guest_role = await factories.Role.create({ name: 'guest' });
    }

    return factories.User.create({
      username: 'guest',
      roles: [guest_role.id],
    });
  },
  async createGuestWithActions (actionsPaths) {
    let guest_role = await Role.findOne({ name: 'guest' });

    if (!guest_role) {
      const actionsPromises = actionsPaths.map(path => factories.Action.create({ path }));
      let actions = await Promise.all(actionsPromises);

      guest_role = await factories.Role.create({ name: 'guest', actions: actions.map(action => action._id) });
    }

    return factories.User.create({
      username: 'guest',
      roles: [guest_role.id],
    });
  }
});
