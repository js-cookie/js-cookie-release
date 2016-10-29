const root = require("app-root-path");
const expect = require("chai").expect;

const createGitRepo = require(root + "/test/dummy-data/create-git-test-repo");
const gitCommit = require(root + "/src/git/git-commit");
const gitTag = require(root + "/src/git/git-tag");

describe("create-tag", function() {
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

    it("should create a tag pointing to a commit", function() {
      const tagName = "v1.0.0";
      return gitCommit("any commit message", testRepo.repository).then(function(commitObjectId) {
        return gitTag(tagName, commitObjectId, testRepo.repository);
      }).then(function() {
        return testRepo.repository.getTagByName(tagName);
      }).then(function(tag) {
        expect(tag.name()).to.equal(tagName);
      });
    });
  });
});