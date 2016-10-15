const root = require("app-root-path");
const expect = require("chai").expect;

const startGitRepoWithServer = require(root + "/test/dummy-data/start-git-repo-with-server");
const gitPush = require(root + "/src/routines/git-push");
const gitCommit = require(root + "/src/routines/git-commit");
const cloneToLocalDir = require(root + "/test/dummy-data/clone-repo-to-local-dir");

describe("git-push", function() {
  it("should push the repository sucessfully to the remote", function() {
    let clonedTestRepository, dummyCommitId, defaultTestRepository;
    return startGitRepoWithServer().then(function(defaultTestRepositoryResult) {
      defaultTestRepository = defaultTestRepositoryResult;
      return cloneToLocalDir(defaultTestRepository.gitHttpUrl);
    }).then(function(clonedTestRepositoryResult) {
      clonedTestRepository = clonedTestRepositoryResult;
      return gitCommit("Dummy commit", clonedTestRepository.repository);
    }).then(function(oid) {
      dummyCommitId = oid;
      return gitPush(defaultTestRepository.remotes[0].name, clonedTestRepository.repository);
    }).then(function() {
      return defaultTestRepository.remotes[0].repository.getCommit(dummyCommitId);
    }).then(function(commit) {
      expect(commit.message()).to.equal("Dummy commit");
    }).finally(function() {
      defaultTestRepository.destroy();
      clonedTestRepository.remove();
    });
  });
});