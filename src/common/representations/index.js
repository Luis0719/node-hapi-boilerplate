const requireDirectory = require('require-directory');

module.exports = {
  init: (J) => {
    const representations = requireDirectory(module);

    for (const key in representations) {
      if (representations[key].init) {
        representations[key].init(J);
      }
    }
  },
};
