const { db } = require('../../testCommon');
const { login } = require('../../../src/services/auth/handlers');

const { factories, initDatabase } = db;

describe('#auth handlers', function () {
  let user;

  before(async function () {
    await initDatabase();

    user = await factories.User.create({ username: 'test', password: 'pass' });
  });

  it('should return null for unexisting user', async function () {
    const result = await login('ghost', 'pass');
    expect(result).to.be.false;
  });

  it('should return null for invalid password', async function () {
    const result = await login('test', 'invalidPass');
    expect(result).to.be.false;
  });

  it('should return valid user', async function () {
    const result = await login('test', 'pass');
    expect(result).to.be.a('string');
  });
});
