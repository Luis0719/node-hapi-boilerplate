'use strict';
const sinon = require('sinon');

const methods = require('../../../src/services/users/methods');
const { db, utils, testServer } = require('../../testCommon');

const { initDatabase, prefabs } = db;

describe('#users routes', function () {
  let serverInject;
  let authorizedAdminHeaders;
  let authorizedGuestHeaders;
  let authorizedGuestNoActionsHeaders;
  let unauthorizedHeaders;

  before(async function () {
    await initDatabase();

    await prefabs.User.createAdmin();
    const admin = await prefabs.User.createAdmin();
    const guestNoActions = await prefabs.User.createGuest();
    const guest = await prefabs.User.createGuestWithActions([
      '/users',
      '/user/{id}',
      ['/user', 'post'],
      ['/user/{id}', 'put'],
      ['/user/set-email/{id}', 'patch'],
      ['/user/reset-password/{id}', 'patch'],
      ['/user/{id}', 'delete'],
    ]);

    serverInject = utils.buildServerInjecter(await testServer.getTestServer());
    authorizedAdminHeaders = utils.buildAuthorizedJwtHeaders(admin.id);
    authorizedGuestNoActionsHeaders = utils.buildAuthorizedJwtHeaders(guestNoActions.id);
    authorizedGuestHeaders = utils.buildAuthorizedJwtHeaders(guest.id);
    unauthorizedHeaders = utils.buildUnathorizedJwtHeaders();
  });

  describe('GET /users', async function () {
    let route;

    before(function () {
      route = {
        url: utils.getUrlWithPrefix('users'),
        method: 'GET',
      }
    });

    it('should return 401 if not authorized', async function() {
      const res = await serverInject(route, unauthorizedHeaders);
      expect(res.statusCode).to.be.equal(401);
    });

    it('should return 401 if guest is not authorized', async function() {
      const res = await serverInject(route, authorizedGuestNoActionsHeaders);
      expect(res.statusCode).to.be.equal(401);
    });

    it('should return 200 if successful', async function() {
      const getUsersStub = sinon.stub(methods, 'getUsers').callsFake(async () => ([]));

      const res = await serverInject(route, authorizedGuestHeaders);
      expect(res.statusCode).to.be.equal(200);

      getUsersStub.restore();
    });
  });

  describe('GET /user/{id}', async function () {
    let route;

    before(function () {
      route = (userId) => ({
        url: utils.getUrlWithPrefix(`user/${userId}`),
        method: 'GET',
      });
    });

    it('should return 401 if not authorized', async function() {
      const res = await serverInject(route(1), unauthorizedHeaders);
      expect(res.statusCode).to.be.equal(401);
    });

    it('should return 401 if guest is not authorized', async function() {
      const res = await serverInject(route(1), authorizedGuestNoActionsHeaders);
      expect(res.statusCode).to.be.equal(401);
    });

    it('should return 200 if successful', async function() {
      const getUserStub = sinon.stub(methods, 'getUserById').callsFake(async () => ({}));

      const res = await serverInject(route(1), authorizedAdminHeaders);
      expect(res.statusCode).to.be.equal(200);

      getUserStub.restore();
    });

    it('should return 404 if user is not found', async function() {
      const getUserStub = sinon.stub(methods, 'getUserById').callsFake(async () => null);

      const res = await serverInject(route(1), authorizedAdminHeaders);
      expect(res.statusCode).to.be.equal(404);

      getUserStub.restore();
    });
  });

  describe('DELETE /user', async function () {
    let route;

    before(function () {
      route = (userId) => ({
        url: utils.getUrlWithPrefix(`user/${userId}`),
        method: 'DELETE',
      });
    });

    it('should return 401 if not authorized', async function() {
      const deleteUserStub = sinon.stub(methods, 'deleteUser').callsFake(async () => ({}));

      const res = await serverInject(route(1), unauthorizedHeaders);
      expect(res.statusCode).to.be.equal(401);

      deleteUserStub.restore();
    });

    it('should return 401 if guest is not authorized', async function() {
      const deleteUserStub = sinon.stub(methods, 'deleteUser').callsFake(async () => ({}));

      const res = await serverInject(route(1), authorizedGuestNoActionsHeaders);
      expect(res.statusCode).to.be.equal(401);

      deleteUserStub.restore();
    });

    it('should return 204 if successful', async function() {
      const deleteUserStub = sinon.stub(methods, 'deleteUser').callsFake(async () => ({}));

      const res = await serverInject(route(1), authorizedAdminHeaders);
      expect(res.statusCode).to.be.equal(204);

      deleteUserStub.restore();
    });

    it('should return 204 if successful', async function() {
      const deleteUserStub = sinon.stub(methods, 'deleteUser').callsFake(async () => ({}));

      const res = await serverInject(route(1), authorizedGuestHeaders);
      expect(res.statusCode).to.be.equal(204);

      deleteUserStub.restore();
    });

    it('should return 204 even if user does not exists', async function() {
      const deleteUserStub = sinon.stub(methods, 'deleteUser').callsFake(async () => null);

      const res = await serverInject(route(1), authorizedGuestHeaders);
      expect(res.statusCode).to.be.equal(204);

      deleteUserStub.restore();
    });
  });
});
