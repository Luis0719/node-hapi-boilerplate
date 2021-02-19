'use strict';
const { testServer } = require('../../../testCommon');

describe('#server', function() {
  let server;

  before(async function () {
    server = await testServer.getTestServer();
  });

  describe('GET /', function() {
    it('responds with 200', async function() {
      const res = await server.inject({
        method: 'get',
        url: '/',
      });

      expect(res.statusCode).to.equal(200);
    });
  })
});
