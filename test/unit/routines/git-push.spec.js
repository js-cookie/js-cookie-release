const root = require("app-root-path");

const startGitRepo = require(root + "/test/fixture/start-git-repo");
const gitPush = require(root + "/src/routines/git-push");

describe("git-push", function() {
  it("should push the repository sucessfully to the remote", function() {
    return startGitRepo().then(function(startedRepository) {
      // TODO: commit before push
      return gitPush(startedRepository.remotes[0]);
    }).then(function() {
      // TODO: check that the repository have been pushed successfully
    });
  });
});