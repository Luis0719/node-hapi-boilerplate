'use strict';
const pkg = require('../package');
const serviceID = {
  name: pkg.name,
  version: pkg.build,
};

const { joiValidator } = require('./middleware');
const { server: config, cors} = require('config');
config.routes = {
    cors,
    validate: {
        failAction: joiValidator
    }
}



const simpleNodeLogger = require('simple-node-logger');
const loggerOptions = {
    errorEventName:'ERROR',
    logDirectory:'/logs',
    fileNamePattern:'server-<DATE>.log',
    dateFormat:'YYYY.MM.DD', // Used for the logfile name
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS', // Used for each log
}
const logger = simpleNodeLogger.createSimpleLogger(loggerOptions);



const routes = require('./routes');
const plugins = require('./plugins')(serviceID, logger);
const createServer = require('./server');

createServer({config, routes, plugins})
    .then(server => {
        return server.start().then(() => {
            logger.info(`Server started on port: ${server.info.port}`)
        });
    }).catch(err => {
        logger.fatal(err);
        process.exitCode = 1;
    })
