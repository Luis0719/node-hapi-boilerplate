const faker = require('faker');
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
      username: faker.internet.userName(),
      roles: [admin_role.id],
    });
  },
  async createGuest () {
    const roleName = `guest${faker.random.number(1000)}`;
    const role = await factories.Role.create({ name: roleName });

    return factories.User.create({
      username: faker.internet.userName(),
      roles: [role.id],
    });
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
    const actions = await Promise.all(actionsPromises);

    const roleName = `guest${faker.random.number(1000)}`;
    const role = await factories.Role.create({ name: roleName, actions: actions.map(action => action._id) });

    return factories.User.create({
      username: faker.internet.userName(),
      roles: [role.id],
    });
  }
});
