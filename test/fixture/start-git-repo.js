"use strict";

const root = require("app-root-path");
const Git = require("nodegit");

const formatServerListener = require(root + "/test/fixture/format-server-listener");
const createGitRepoFixture = require(root + "/test/fixture/create-git-repo-fixture");
const createGitServerFixture = require(root + "/test/fixture/create-git-server-fixture");

module.exports = function() {
  let removeGitRepoFixture = () => {};
  let closeGitServerFixture = () => {};
  return createGitRepoFixture().then(function(repoFixture) {
    removeGitRepoFixture = repoFixture.remove;
    return createGitServerFixture().then(function(serverFixture) {
      closeGitServerFixture = serverFixture.close;
      Git.Remote.create(
        repoFixture.repository,
        "origin",
        formatServerListener(serverFixture.listener)
      );
      return Git.Remote.list(repoFixture.repository);
    }).then(function(remoteNames) {
      return {
        remotes: remoteNames.map(function(remoteName) {
          return {
            repository: repoFixture.repository,
            name: remoteName
          };
        })
      };
    });
  }).finally(function() {
    removeGitRepoFixture();
    closeGitServerFixture();
  });
};
