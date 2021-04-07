'use strict';
const sinon = require('sinon');

const methods = require('../../../src/services/users/methods');
const { db, utils, testServer } = require('../../testCommon');

const { initDatabase } = db;

describe('#users routes', function () {
  let serverInject;
  let authorizedHeaders;

  before(async function () {
    await initDatabase();

    let admin_role = await db.factories.Role.create({ name: 'admin' });
    let admin = await db.factories.User.create({ roles: [admin_role.id] });

    serverInject = utils.buildServerInjecter(await testServer.getTestServer());
    authorizedHeaders = utils.buildAuthorizedJwtHeaders(admin.id);
  });

  describe('DELETE /users', async function () {
    let route;

    before(function () {
      route = (userId) => ({
        url: `/api/users/${userId}`,
        method: 'DELETE',
      });
    })

    it('should return 204 if successful', async function() {
      const deleteUserStub = sinon.stub(methods, 'deleteUser').callsFake(async () => ({}));

      const res = await serverInject(route(1), authorizedHeaders);
      expect(res.statusCode).to.be.equal(204);

      deleteUserStub.restore();
    });

    it('should return 204 even if user does not exists', async function() {
      const deleteUserStub = sinon.stub(methods, 'deleteUser').callsFake(async () => null);

      const res = await serverInject(route(1), authorizedHeaders);
      expect(res.statusCode).to.be.equal(204);

      deleteUserStub.restore();
    });

    it('should return 400 if user id does not exists', async function() {
      const res = await serverInject(route(), authorizedHeaders);
      expect(res.statusCode).to.be.equal(400);
    });

    it('should return 400 if user id is not valid', async function() {
      const res = await serverInject(route('invalidId'), authorizedHeaders);
      expect(res.statusCode).to.be.equal(400);
    });
  });
});
