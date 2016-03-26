const Git = require("nodegit");
const rimraf = require("rimraf");

module.exports = function() {
  const repoDirectory = "./.test-repo";
  const IS_BARE_FALSE = 0;
  return Git.Repository.init(repoDirectory, IS_BARE_FALSE).then(function(repository) {
    return {
      repository: repository,
      remove: function() {
        rimraf.sync(repoDirectory);
      }
    };
  });
};
