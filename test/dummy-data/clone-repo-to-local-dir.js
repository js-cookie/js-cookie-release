const nodegit = require("nodegit");
const rimraf = require("rimraf");

module.exports = function(gitHttpUrl) {
  const localDirectory = ".cloned-repo-from-server";
  return nodegit.Clone.clone(gitHttpUrl, localDirectory).then(function(clonedRepository) {
    return {
      repository: clonedRepository,
      remove: function() {
        rimraf.sync(localDirectory);
      }
    };
  });
};