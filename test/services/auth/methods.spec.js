const { db } = require('../../../testCommon');
const { getUser, login } = require('../../../../src/services/auth/methods');

const { factories, initDatabase } = db;

describe('#auth methods', function() {
  let user;

  before(async function () {
    await initDatabase();

    user = await factories.User.create({ username: 'test', password: 'pass' });
  });

  describe('#getUser', function () {
    it('should return null for unexisting user', async function () {
      const result = await getUser('ghost', 'pass');
      expect(result).to.be.null;
    });

    it('should find user by username', async function () {
      const result = await getUser('test', 'pass');
      expect(result.id).to.be.equal(user.id);
    });
  });

  describe('#login', function() {
    it('should return false for unexisting user', async function () {
      const result = await login('ghost', 'pass');
      expect(result).to.be.false;
    });

    it('should return false for invalid password', async function () {
      const result = await login('test', 'invalidPass');
      expect(result).to.be.false;
    });

    it('should return valid user', async function () {
      const result = await login('test', 'pass');
      expect(result).to.be.a('string');
    });
  });
})
