module.exports = (factories) => ({
  async createAdmin () {
    return factories.Role.create({ name: 'admin' });
  },
  async createGuest () {
    const name = `guest${faker.random.number(1000)}`;
    return factories.Role.create({ name });
  },
  async createGuestWithActions (roleActions) {
    const actionsPromises = roleActions.map(action => {
      let path, method;

      // An action could be a single string (e.g. /api/users)
      // Or an array, containing the method (e.g. ['/api/users', 'post'])
      if (Array.isArray(action)) {
        [path, method] = action;

      } else {
        path = action;
        method = 'get';
      }

      // Always add prefix
      path = `/api${path}`;

      return factories.Action.create({ path, method });
    });
    let actions = await Promise.all(actionsPromises);

    const name = `guest${faker.random.number(1000)}`;
    return factories.Role.create({ name, actions: actions.map(action => action._id) });
  }
});
