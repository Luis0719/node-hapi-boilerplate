'use strict';
process.env.NODE_ENV = 'test';

const chai = require('chai');
global.expect = chai.expect;

const { testServer } = require('./testCommon');
testServer.createTestServer().then(() => {
  console.log('Test server created'); // eslint-disable-line no-console
});
