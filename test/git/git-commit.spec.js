const root = require("app-root-path");
const expect = require("chai").expect;

const createGitRepo = require(root + "/test/dummy-data/create-git-test-repo");
const gitCommit = require(root + "/src/git/git-commit");

describe("git-commit", function() {

  describe("Given a dummy git repository running locally", function() {
    let testRepo;

    beforeEach(function() {
      return createGitRepo().then(function(createdRepo) {
        testRepo = createdRepo;
      });
    });

    afterEach(function() {
      testRepo.remove();
    });

    it("should create a commit with the given message", function() {
      const commitMessage = "Release version 0.0.1";
      return gitCommit(commitMessage, testRepo.repository).then(function(commitObjectId) {
        expect(commitObjectId).to.be.a("string");
        return testRepo.repository.getHeadCommit();
      }).then(function(headCommit) {
        expect(headCommit).not.to.equal(null);
        expect(headCommit.message()).to.equal("Release version 0.0.1");
      });
    });
  });
});
