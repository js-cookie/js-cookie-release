const root = require("app-root-path");
const replace = require("str-replace");
const expect = require("chai").expect;

const readFile = require(root + "/src/file/read-file");
const replaceFileContent = require(root + "/src/file/replace-file-content");
const createFileSync = require(root + "/test/dummy-data/create-file-sync");

describe("replace-file-content", function() {

  describe("Given a dummy file with any content", function() {
    const targetFileName = "test-file.txt";
    let removeDummyFile;

    beforeEach(function() {
      removeDummyFile = createFileSync(targetFileName, "Some file content");
    });

    afterEach(function() {
      removeDummyFile();
    });

    it("should replace something in a file", function() {
      const replacementOperation = function(fileContent) {
        return replace("file").from(fileContent).with("box");
      };
      return replaceFileContent(targetFileName, replacementOperation).then(function() {
        return readFile(targetFileName);
      }).then(function(fileContent) {
        expect(fileContent).to.equal("Some box content");
      });
    });
  });
});
