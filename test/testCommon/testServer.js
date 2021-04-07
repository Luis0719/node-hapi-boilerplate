let testServer;

const createTestServer = () => {
  return require('../../src/app');
};

const getTestServer = async () => {
  if (!testServer) testServer = await createTestServer();

  return testServer;
};

const stopServer = async () => {
  if (!testServer) return;

  await testServer.stop();
  testServer = null;
  return;
}

module.exports = {
  createTestServer,
  getTestServer,
  stopServer,
};
