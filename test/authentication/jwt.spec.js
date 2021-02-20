const mongoose = require('mongoose');

const { db, testServer } = require('../testCommon');
const { validate } = require('../../src/authentication/jwt');

const { initDatabase, factories } = db;

const buildPayload = (userId) => ({
  decoded: {
    payload: {
      id: userId,
    },
  },
});

const buildRequest = (path, method = 'get') => ({
  route: {
    method,
    path,
  },
});

describe('#jwt', function () {
  let server;
  let admin_user;
  let guest_user;

  before(async function () {
    server = testServer.getTestServer();
    await initDatabase();

    const public_action = await factories.Action.create({ path: '/public' });
    await factories.Action.create({ path: '/private' });

    const admin_role = await factories.Role.create({ name: 'admin' });
    const guest_role = await factories.Role.create({
      name: 'guest',
      actions: [public_action.id],
    });

    admin_user = await factories.User.create({ username: 'test1', roles: [admin_role.id] });
    guest_user = await factories.User.create({ username: 'test2', roles: [guest_role.id] });
  });

  describe('validate', function () {
    it('should fail if no id is provided', async function () {
      const payload = buildPayload();
      const request = buildRequest();

      return expect(validate(payload, request)).to.be.rejectedWith(
        /Invalid authorization key/
      );
    });

    it('should fail for unexisting user', async function () {
      const payload = buildPayload(mongoose.Types.ObjectId());
      const request = buildRequest();

      return expect(validate(payload, request)).to.be.rejectedWith(
        /User not authorized/
      );
    });

    it('should always allow admin', async function () {
      const payload = buildPayload(admin_user.id);
      const request = buildRequest('/private');

      const result = await validate(payload, request);
      expect(result.isValid).to.be.true;
    });

    it('should deny if role is not allowed', async function () {
      const payload = buildPayload(guest_user.id);
      const request = buildRequest('/private');

      return expect(validate(payload, request)).to.be.rejectedWith(
        /User not authorized/
      );
    });

    it('should allow role if it is allowed', async function () {
      const payload = buildPayload(guest_user.id);
      const request = buildRequest('/public');

      const result = await validate(payload, request);
      expect(result.isValid).to.be.true;
    });
  });
});
