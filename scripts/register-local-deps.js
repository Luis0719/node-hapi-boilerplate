'use strict';
/* eslint-disable no-console */

const packageJson = require('../package');
const exec = require('child_process').exec;

console.log('*** Creting Symbolic links for custom dependencies into node_modules ***');
var dependencies = Object.keys(packageJson.customDependencies);
dependencies.forEach(function (depName) {
  var filePath = '.' + packageJson.customDependencies[depName];
  exec(`ln -svnf ${filePath} ./node_modules/${depName}`, function (error, stdout, stderr) {
    if (error) {
      console.error(stderr);
      process.exit(1);
      throw error;
    }
    console.log(`Symlinked: ${filePath} -> ./node_modules/${depName}`);
  });
});
