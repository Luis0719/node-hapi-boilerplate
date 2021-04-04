const { db } = require('common');
const { cleanDB } = require('./utils');

const actionsSeeder = require('./Actions');
const rolesSeeder = require('./Roles');
const usersSeeder = require('./Users');
const actionGroupsSeeder = require('./ActionGroups');

const seed = async () => {
  db.connect();
  await cleanDB();

  const actions = await actionsSeeder.seed();
  const roles = await rolesSeeder.seed(actions);
  await usersSeeder.seed(roles);
  await actionGroupsSeeder.seed(actions);
}

(async () => {
  await seed();
  process.exit(0);
})();
