const mongoose = require('mongoose');
const { db, testServer } = require('../testCommon');

const { jwtBaseStrategy } = require('../../src/authentication/jwt/base');
const anyAuthenticated = require('../../src/authentication/jwt/_anyAuthenticated')
  .hasPermission;
const adminOnly = require('../../src/authentication/jwt/_adminOnly')
  .hasPermission;
const userByRole = require('../../src/authentication/jwt/_userByRole')
  .hasPermission;

const { initDatabase, prefabs } = db;

const buildPayload = (userId) => ({
  decoded: {
    payload: {
      id: userId,
    },
  },
});

const buildHasPermissionPayload = (userId) => ({
  id: userId,
});

const buildRequest = (path, method = 'get') => ({
  route: {
    method,
    path,
  },
});

const userIdAsString = (user) => user._id.toString();

describe('#jwt', function () {
  let server;
  let admin_user;
  let guest_user;

  before(async function () {
    server = testServer.getTestServer();
    await initDatabase();

    admin_user = await prefabs.User.createAdmin();
    guest_user = await prefabs.User.createGuestWithActions(['/public'])
  });

  describe('#jwtBase', function () {
    let hasPermissionPositive;
    let hasPermissionNegative;

    before(function () {
      hasPermissionPositive = (user) => () =>
        Promise.resolve({ authorized: true, user });
      hasPermissionNegative = () => Promise.resolve({ authorized: false });
    });

    it('should fail is hasPermission is not a function', function () {
      expect(() => jwtBaseStrategy('test', {})).to.throw(
        /Error for JWT test\. 'hasPermission' must be a function/
      );
    });

    it('should fail if no id is provided', async function () {
      const validate = jwtBaseStrategy('test', hasPermissionNegative).validate;
      const payload = buildPayload();

      return expect(validate(payload, {})).to.be.rejectedWith(
        /Invalid authorization key/
      );
    });

    it('should fail if user is unauthorized', async function () {
      const validate = jwtBaseStrategy('test', hasPermissionNegative).validate;
      const payload = buildPayload(mongoose.Types.ObjectId());

      return expect(validate(payload, {})).to.be.rejectedWith(
        /User not authorized/
      );
    });

    it('should pass if user is authorized', async function () {
      const validate = jwtBaseStrategy(
        'test',
        hasPermissionPositive(guest_user)
      ).validate;
      const payload = buildPayload(mongoose.Types.ObjectId());

      const result = await validate(payload, {});
      expect(result.isValid).to.be.true;
      expect(result.credentials.id).to.be.equal(guest_user.id);
    });
  });

  describe('#jwtAnyAuthorized', function () {
    it('should authorize if user exists', async function () {
      const data = buildHasPermissionPayload(guest_user.id);

      const result = await anyAuthenticated({}, data);
      expect(result.authorized).to.be.true;
      expect(userIdAsString(result.user)).to.be.equal(guest_user.id);
    });

    it('should not authorize if user does not exists', async function () {
      const data = buildHasPermissionPayload(mongoose.Types.ObjectId());

      const result = await anyAuthenticated({}, data);
      expect(result.authorized).to.be.false;
    });
  });

  describe('#jwtAdminOnly', function () {
    it('should not authorize if user does not exists', async function () {
      const data = buildHasPermissionPayload(mongoose.Types.ObjectId());

      const result = await adminOnly({}, data);
      expect(result.authorized).to.be.false;
    });

    it('should not authorize if user is not admin', async function () {
      const data = buildHasPermissionPayload(guest_user.id);

      const result = await adminOnly({}, data);
      expect(result.authorized).to.be.false;
    });

    it('should authorize if user is admin', async function () {
      const data = buildHasPermissionPayload(admin_user.id);

      const result = await adminOnly({}, data);
      expect(result.authorized).to.be.true;
      expect(userIdAsString(result.user)).to.be.equal(admin_user.id);
    });
  });

  describe('#jwtUserByRole', function () {
    it('should not authorize if user does not exists', async function () {
      const data = buildHasPermissionPayload(mongoose.Types.ObjectId());

      const result = await userByRole({}, data);
      expect(result.authorized).to.be.false;
    });

    it('should authorize if user is admin', async function () {
      const data = buildHasPermissionPayload(admin_user.id);

      const result = await userByRole({}, data);
      expect(result.authorized).to.be.true;
      expect(userIdAsString(result.user)).to.be.equal(admin_user.id);
    });

    it('should not authorize if role does not have permission', async function () {
      const payload = buildHasPermissionPayload(guest_user.id);
      const request = buildRequest('/private');

      const result = await userByRole(request, payload);
      expect(result.authorized).to.be.false;
    });

    it('should authorize if role has permission', async function () {
      const payload = buildHasPermissionPayload(guest_user.id);
      const request = buildRequest('/public');

      const result = await userByRole(request, payload);
      expect(result.authorized).to.be.true;
      expect(userIdAsString(result.user)).to.be.equal(guest_user.id);
    });
  });
});
