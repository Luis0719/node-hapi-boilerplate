'use strict';
process.env.NODE_ENV = 'test';

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('chai-datetime'));
global.expect = chai.expect;

const { testServer } = require('./testCommon');
console.log('Creating test server'); // eslint-disable-line no-console
testServer.createTestServer().then(() => {
  console.log('Test server created'); // eslint-disable-line no-console
});
