'use strict';

const { expect } = require('chai');
const { createTestServer } = require('../../../testCommon');

describe('GET /', function () {
  let server;

  before(async function () {
    server = await createTestServer();
  });

  after(async function () {
    await server.stop();
  });

  it('responds with 200', async function () {
    const res = await server.inject({
      method: 'get',
      url: '/',
    });

    expect(res.statusCode).to.equal(200);
  });

  it('responds with 401', async function () {
    const res = await server.inject({
      method: 'get',
      url: '/api/v1/users',
    });

    expect(res.statusCode).to.equal(401);
  });
});
