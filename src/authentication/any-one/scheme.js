module.exports = (server, options) => {
  return {
    authenticate: function (req, h) {
      return h.authenticate({ credentials: {} });
    },
  };
};
