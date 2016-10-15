const root = require("app-root-path");
const Git = require("nodegit");

const formatServerListener = require(root + "/test/dummy-data/format-server-listener");
const createGitRepo = require(root + "/test/dummy-data/create-git-test-repo");
const createGitServer = require(root + "/test/dummy-data/create-git-test-server");

module.exports = function() {
  let repo, server;
  const createOriginRemoteFor = function(repository, serverUrl) {
    return Git.Remote.create(repository, "origin", serverUrl);
  };
  const remoteNameToRemoteEntity = function(remoteName) {
    return {
      repository: repo.repository,
      name: remoteName
    };
  };
  return createGitRepo().then(function(createdRepo) {
    repo = createdRepo;
    return createGitServer();
  }).then(function(createdServer) {
    server = createdServer;
    const serverUrl = formatServerListener(server.listener);
    return createOriginRemoteFor(repo.repository, serverUrl);
  }).then(function() {
    return Git.Remote.list(repo.repository).then(function(remoteNames) {
      return {
        remotes: remoteNames.map(remoteNameToRemoteEntity),
        gitHttpUrl: "http://" + formatServerListener(server.listener) + "/.git",
        destroy: function() {
          repo.remove();
          server.close();
        }
      };
    });
  });
};
