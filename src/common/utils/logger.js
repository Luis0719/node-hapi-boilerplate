const simpleNodeLogger = require('simple-node-logger');

const loggerOptions = {
  errorEventName: 'ERROR',
  logDirectory: '/logs',
  fileNamePattern: 'server-<DATE>.log',
  dateFormat: 'YYYY.MM.DD', // Used for the logfile name
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS', // Used for each log
};
const logger = simpleNodeLogger.createSimpleLogger(loggerOptions);

module.exports = logger;
