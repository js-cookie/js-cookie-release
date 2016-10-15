const root = require("app-root-path");
const Git = require("nodegit");

const formatServerListener = require(root + "/test/dummy-data/format-server-listener");
const createGitRepoFixture = require(root + "/test/dummy-data/create-git-test-repo");
const createGitServerFixture = require(root + "/test/dummy-data/create-git-test-server");

module.exports = function() {
  let repoFixture, serverFixture;
  const createOriginRemoteFor = function(repository, serverUrl) {
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
    const serverUrl = formatServerListener(serverFixture.listener);
    return createOriginRemoteFor(repoFixture.repository, serverUrl);
  }).then(function() {
    return Git.Remote.list(repoFixture.repository).then(function(remoteNames) {
      return {
        remotes: remoteNames.map(remoteNameToRemoteEntity),
        gitHttpUrl: "http://" + formatServerListener(serverFixture.listener) + "/.git",
        destroy: function() {
          repoFixture.remove();
          serverFixture.close();
        }
      };
    });
  });
};
