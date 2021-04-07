module.exports = (factories) => ({
  async createAdmin () {
    return factories.Role.create({ name: 'admin' });
  },
  async createGuest () {
    return factories.Role.create({ name: 'guest' });
  },
  async createGuestWithActions (actionsPaths) {
    let actions = await Promise.all(actionsPaths.map(path => factories.Action.create({ path })));

    return factories.Role.create({ name: 'guest', actions: actions.map(action => action._id) });
  }
});
