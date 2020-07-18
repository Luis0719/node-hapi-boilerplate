'use strict';
/* eslint-disable no-console */

/*
 * Creates a reference of the fox admin dependencies into node_modules
 */
const packageJson = require('../package');
const exec = require('child_process').exec;

console.log('*** Symlinking local dependencies into node_modules ***');
exec('mkdir -p node_modules', function (error, stdout, stderr) {
  console.log("REGS");
  if (error) {
    console.error(stderr);
    process.exit(1);
  }
  console.log(stdout);

  var depNames = Object.keys(packageJson.foxAdminDependencies);
  depNames.forEach(function (depName) {
    var filePath = '.' + packageJson.foxAdminDependencies[depName];
    exec('ln -svnf ' + filePath + ' ./node_modules/' + depName, function (error, stdout, stderr) {
      if (error) {
        console.error(stderr);
        process.exit(1);
      }
      console.log('Symlinked:', filePath, '-> ./node_modules/' + depName);
    });
  });
});
