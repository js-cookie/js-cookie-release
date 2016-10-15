const Git = require("nodegit");
const rimraf = require("rimraf");
const root = require("app-root-path");

const resolveGitDirectoryFixture = require(root + "/test/dummy-data/resolve-git-test-directory");

module.exports = function() {
  const repoDirectory = resolveGitDirectoryFixture();
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
