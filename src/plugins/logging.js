module.exports = {
  name: 'server-logging',
  version: '1.0.0',
  register: (server, { logger }) => {
    if (!logger) {
      throw new Error('options.logger is required to be a logger function');
    }

    server.ext({
      type: 'onRequest',
      method: (request, h) => {
        // Attach logger into each request's plugins
        request.plugins.logger = logger;
        return h.continue;
      }
    });
  }
}