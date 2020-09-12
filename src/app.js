'use strict';
require('dotenv').config();

const { utils } = require('common');
const pkg = require('../package');

const serviceID = {
  name: pkg.name,
  version: pkg.build,
};

const logger = utils.logger;

const { joiValidator } = require('./middleware');
const { server: config, cors } = require('config');
config.routes = {
  cors,
  validate: {
    failAction: joiValidator,
  },
};

const routes = require('./routes');
const plugins = require('./plugins')(serviceID, logger);
const createServer = require('./server');

createServer({ config, routes, plugins })
  .then(server => {
    return server.start().then(() => {
      logger.info(`Server started on port: ${server.info.port}`);
    });
  })
  .catch(err => {
    logger.fatal(err);
    process.exitCode = 1;
  });
