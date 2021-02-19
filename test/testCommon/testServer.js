let testServer;

const createTestServer = () => {
  return require('../../src/app');
};

const getTestServer = () => {
  if (!testServer) testServer = createTestServer();

  return testServer;
};

module.exports = {
  createTestServer,
  getTestServer,
};
