const root = require("app-root-path");
const expect = require("chai").expect;

const startGitRepoWithServer = require(root + "/test/dummy-data/start-git-repo-with-server");
const gitPush = require(root + "/src/git/git-push");
const gitCommit = require(root + "/src/git/git-commit");
const cloneToLocalDir = require(root + "/test/dummy-data/clone-repo-to-local-dir");

describe("git-push", function() {
  let defaultTestRepository;
  let clonedTestRepository;

  describe("Given a dummy server with git enabled cloned to local dir", function() {

    beforeEach(function() {
      return startGitRepoWithServer().then(function(defaultTestRepositoryResult) {
        defaultTestRepository = defaultTestRepositoryResult;
        return cloneToLocalDir(defaultTestRepository.gitHttpUrl);
      }).then(function(clonedTestRepositoryResult) {
        clonedTestRepository = clonedTestRepositoryResult;
      });
    });

    afterEach(function() {
      defaultTestRepository.destroy();
      clonedTestRepository.remove();
    });

    it("should commit and push the repository sucessfully to the remote", function() {
      let dummyCommitId;
      return gitCommit("Dummy commit", clonedTestRepository.repository).then(function(oid) {
        dummyCommitId = oid;
        return gitPush(defaultTestRepository.remotes[0].name, clonedTestRepository.repository);
      }).then(function() {
        return defaultTestRepository.remotes[0].repository.getCommit(dummyCommitId);
      }).then(function(commit) {
        expect(commit.message()).to.equal("Dummy commit");
      });
    });
  });
});