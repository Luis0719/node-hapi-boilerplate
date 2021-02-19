let testServer;

const createTestServer = () => {
  return require('../../src/app');
};

const getTestServer = async () => {
  if (!testServer) testServer = await createTestServer();

  return testServer;
};

module.exports = {
  createTestServer,
  getTestServer,
};
