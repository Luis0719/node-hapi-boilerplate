const { db, utils } = require('../../testCommon');
const { login } = require('../../..//src/services/auth/handlers');

const { factories, initDatabase } = db;

const buildLoginPayload = (username, password) => ({
  payload: {
    username,
    password,
  },
});

describe('#auth handlers', function () {
  let user;

  before(async function () {
    await initDatabase();

    user = await factories.User.create({ username: 'test', password: 'pass' });
  });

  describe('#login', function () {
    it('should fail for unexisting user', async function () {
      const req = utils.buildRequestBody(buildLoginPayload('ghost', 'pass'));
      expect(login(req)).to.be.rejectedWith(/Invalid user or password/);
    });

    it('should fail for invalid password', async function () {
      const req = utils.buildRequestBody(
        buildLoginPayload('test', 'invalidPass')
      );
      expect(login(req)).to.be.rejectedWith(/Invalid user or password/);
    });

    it('should pass for valid user', async function () {
      const req = utils.buildRequestBody(buildLoginPayload('test', 'pass'));
      const result = await login(req);
      expect(result).to.be.a('string');
    });
  });
});
