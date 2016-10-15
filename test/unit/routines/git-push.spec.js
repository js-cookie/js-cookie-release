const root = require("app-root-path");

const startGitRepo = require(root + "/test/fixture/start-git-repo");
const gitPush = require(root + "/src/routines/git-push");
const gitCommit = require(root + "/src/routines/git-commit");

describe("git-push", function() {
  it("should push the repository sucessfully to the remote", function() {
    let testRepository;
    return startGitRepo().then(function(startedTestRepository) {
      testRepository = startedTestRepository;
      return gitCommit("Dummy commit", testRepository.remotes[0].repository);
    }).then(function() {
      return gitPush(testRepository.remotes[0]);
    }).then(function() {
      // TODO: check that the repository have been pushed successfully
    }).finally(function() {
      testRepository.destroy();
    });
  });
});