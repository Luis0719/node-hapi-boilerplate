'use strict';
const { representations, db } = require('common');
const jiggler = require('jiggler');

representations.init(jiggler);

const { start } = require('./server');
const server = start().then((server) => {
  db.connect(server.logger);

  process.on('unhandledRejection', (err) => {
    server.logger.error(err);
    process.exit(1);
  });

  return server;
});

module.exports = server;
