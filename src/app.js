'use strict';

const { utils, representations } = require('common');
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

const logger = utils.logger;
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
