'use strict';

const { representations } = require('common');
const pkg = require('../package');
const jiggler = require('jiggler');

const serviceID = {
  name: pkg.name,
  version: pkg.build,
};

// Load jiggle representations
representations.init(jiggler);

const { joiValidator } = require('./middleware');
const { server: config, cors } = require('config');
config.routes = {
  cors,
  validate: {
    failAction: joiValidator,
  },
};

const routes = require('./routes');
const plugins = require('./plugins')(serviceID);
const createServer = require('./server');

createServer({ config, routes, plugins })
  .then(server => {
    return server.start().then(() => {});
  })
  .catch(err => {
    console.log(err); // eslint-disable-line no-console
    process.exitCode = 1;
  });
