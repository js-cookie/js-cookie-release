const root = require("app-root-path");
const replace = require("str-replace");
const expect = require("expect.js");

const readFile = require(root + "/src/file/read-file");
const replaceFileContent = require(root + "/src/routines/replace-file-content");
const createFileFixtureSync = require(root + "/test/fixture/create-file-fixture-sync");

describe("replace-file-content", function() {

  it("should replace something in a file", function() {
    const targetFileName = "test-file.txt";
    const removeFileFixtureSync = createFileFixtureSync(targetFileName, "Some file content");
    const replacementOperation = function(fileContent) {
      return replace("file").from(fileContent).with("box");
    };
    return replaceFileContent(targetFileName, replacementOperation).then(function() {
      return readFile(targetFileName);
    }).then(function(fileContent) {
      expect(fileContent).to.be("Some box content");
    }).finally(function() {
      removeFileFixtureSync();
    });
  });

});
