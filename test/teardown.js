const { stopServer } = require('./testCommon/testServer');

exports.mochaHooks = {
  afterAll() {
    stopServer().then(() => {
      process.exit(0);
    });
  },
};
