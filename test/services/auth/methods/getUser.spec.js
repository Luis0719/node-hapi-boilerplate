const { db } = require('../../../testCommon');
const { getUser } = require('../../../../src/services/auth/methods');

const { factories, initDatabase } = db;

describe('#auth/getUser method', function () {
  let user;

  before(async function () {
    await initDatabase();

    user = await factories.User.create({ username: 'myUsername', password: 'pass' });
  });

  it('should return null for unexisting user', async function () {
    const result = await getUser('ghost', 'pass');
    expect(result).to.be.null;
  });

  it('should find user by username', async function () {
    const result = await getUser('myUsername', 'pass');
    expect(result.id).to.be.equal(user.id);
  });
});
