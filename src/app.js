'use strict';

const { representations } = require('common');
const jiggler = require('jiggler');

// Load jiggle representations
representations.init(jiggler);

// Loan and start server
const { start } = require('./server');
start().then(server => {
  process.on('unhandledRejection', err => {
    server.logger.error(err);
    process.exit(1);
  });
});
