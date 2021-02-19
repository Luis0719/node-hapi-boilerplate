'use strict';
const { testServer } = require('../../../testCommon');

describe('GET /', function () {
  let server;

  before(async function () {
    server = await testServer.getTestServer();
  });

  it('responds with 200', async function() {
    const res = await server.inject({
      method: 'get',
      url: '/',
    });

    expect(res.statusCode).to.equal(200);
  });

  it('responds with 401', async function() {
    const res = await server.inject({
      method: 'get',
      url: '/api/users',
    });

    expect(res.statusCode).to.equal(401);
  });
});
