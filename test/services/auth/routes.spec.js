const { db, utils, testServer } = require('../../testCommon');

const { factories, initDatabase } = db;

describe('#auth routes', function () {
  let serverInject;
  let authorizedHeaders;
  let user;

  before(async function () {
    await initDatabase();

    serverInject = utils.buildServerInjecter(await testServer.getTestServer());
    authorizedHeaders = utils.buildAuthorizedHeaders();
    user = await factories.User.create({ password: 'pass' });
  });

  describe('POST /login', function () {
    let route;
    before(function () {
      route = {
        url: '/api/auth/login',
        method: 'POST',
      };
    });

    it('should fail if unathorized', async function () {
      const payload = {
        username: 'username',
        password: 'pass',
      };

      const res = await serverInject(route, {}, payload);
      expect(res.statusCode).to.equal(401);
    });

    it('should fail if username is missing', async function () {
      const payload = {
        password: 'pass',
      };

      const res = await serverInject(route, authorizedHeaders, payload);
      expect(res.statusCode).to.equal(400);
      expect(res.result.message).to.equal('username is required');
    });

    it('should fail if password is missing', async function () {
      const payload = {
        username: 'username',
      };

      const res = await serverInject(route, authorizedHeaders, payload);
      expect(res.statusCode).to.equal(400);
      expect(res.result.message).to.equal('password is required');
    });

    it('should pass with valid payload and valid user', async function () {
      const payload = {
        username: user.username,
        password: 'pass',
      };

      const res = await serverInject(route, authorizedHeaders, payload);
      expect(res.statusCode).to.equal(200);
    });
  });
});
