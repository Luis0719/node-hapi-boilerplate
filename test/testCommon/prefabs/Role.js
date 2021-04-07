module.exports = (factories) => ({
  async createAdmin () {
    return factories.Role.create({ name: 'admin' });
  },
  async createGuest () {
    const name = `guest${faker.random.number(1000)}`;
    return factories.Role.create({ name });
  },
  async createGuestWithActions (actionsPaths) {
    let actions = await Promise.all(actionsPaths.map(path => factories.Action.create({ path })));

    const name = `guest${faker.random.number(1000)}`;
    return factories.Role.create({ name, actions: actions.map(action => action._id) });
  }
});
