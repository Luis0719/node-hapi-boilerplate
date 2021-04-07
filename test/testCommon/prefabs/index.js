const requireDir = require('require-directory');

module.exports = (factories) => {
  const initPrefab = (prefab) => prefab(factories);

  return requireDir(module, { visit: initPrefab });
}
