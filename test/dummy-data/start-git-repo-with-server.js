const root = require("app-root-path");
const Git = require("nodegit");

const formatServerListener = require(root + "/test/dummy-data/format-server-listener");
const createGitRepoFixture = require(root + "/test/dummy-data/create-git-test-repo");
const createGitServerFixture = require(root + "/test/dummy-data/create-git-test-server");

module.exports = function() {
  let repoFixture, serverFixture;
  const createOriginRemoteFor = function(repository, serverListener) {
    const serverUrl = formatServerListener(serverListener);
    return Git.Remote.create(repository, "origin", serverUrl);
  };
  const remoteNameToRemoteEntity = function(remoteName) {
    return {
      repository: repoFixture.repository,
      name: remoteName
    };
  };
  return createGitRepoFixture().then(function(createdRepoFixture) {
    repoFixture = createdRepoFixture;
    return createGitServerFixture();
  }).then(function(createdServerFixture) {
    serverFixture = createdServerFixture;
    return createOriginRemoteFor(repoFixture.repository, serverFixture.listener);
  }).then(function() {
    return Git.Remote.list(repoFixture.repository).then(function(remoteNames) {
      return {
        remotes: remoteNames.map(remoteNameToRemoteEntity),
        destroy: function() {
          repoFixture.remove();
          serverFixture.close();
        }
      };
    });
  });
};
