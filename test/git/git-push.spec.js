const root = require("app-root-path");
const expect = require("chai").expect;

const startGitRepoWithServer = require(root + "/test/dummy-data/start-git-repo-with-server");
const gitPushMaster = require(root + "/src/git/git-push-master");
const gitPushTag = require(root + "/src/git/git-push-tag");
const gitCommit = require(root + "/src/git/git-commit");
const gitTag = require(root + "/src/git/git-tag");
const cloneToLocalDir = require(root + "/test/dummy-data/clone-repo-to-local-dir");

describe("Given a dummy server with git enabled cloned to local dir", function() {
  let defaultTestRepository;
  let clonedTestRepository;

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

  describe("Git Push Master To Remote", function() {
    it("should commit and push the repository sucessfully to the remote", function() {
      let dummyCommitId;
      return gitCommit("Dummy commit", clonedTestRepository.repository).then(function(oid) {
        dummyCommitId = oid;
        return gitPushMaster(defaultTestRepository.remotes[0].name, clonedTestRepository.repository);
      }).then(function() {
        return defaultTestRepository.remotes[0].repository.getCommit(dummyCommitId);
      }).then(function(commit) {
        expect(commit.message()).to.equal("Dummy commit");
      });
    });
  });

  describe("Git Push Tag To Remote", function() {
    it("should commit, create a tag and push successfully to the remote", function() {
      return gitCommit("Dummy commit", clonedTestRepository.repository).then(function(dummyCommitId) {
        return gitTag("dummy_tag_name", dummyCommitId, clonedTestRepository.repository);
      }).then(function() {
        return gitPushTag("dummy_tag_name", defaultTestRepository.remotes[0].name, clonedTestRepository.repository);
      }).then(function deleteLocalTag() {
        return require("nodegit").Tag.delete(clonedTestRepository.repository, "dummy_tag_name");
      }).then(function fetchRemoteTag() {
        return clonedTestRepository.repository.getRemote(defaultTestRepository.remotes[0].name).then(function(remote) {
          return remote.fetch(["refs/tags/dummy_tag_name"]);
        });
      }).then(function() {
        return clonedTestRepository.repository.getTagByName("dummy_tag_name").then(function(tag) {
          expect(tag.name()).to.equal("dummy_tag_name");
        });
      });
    });
  });
});
