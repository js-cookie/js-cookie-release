const root = require("app-root-path");
const expect = require("chai").expect;

const readFile = require(root + "/src/file/read-file");
const bumpSourceFile = require(root + "/src/routines/bump-source-file");
const createFileSync = require(root + "/test/dummy-data/create-file-sync");

describe("bump-source-file", function() {

  describe("Given a source file with a version format inside", function() {
    const targetFilename = "bump-minor.js";
    let removeDummyFileSync;

    beforeEach(function() {
      removeDummyFileSync = createFileSync(targetFilename, "/* JS Cookie v0.0.0 */");
    });

    afterEach(function() {
      removeDummyFileSync();
    });

    it("should edit and bump the 'minor' version using Regular Expression", function() {
      const findVersion = function(fileContent) {
        const match = /Cookie v([0-9]{1,2}.[0-9]{1,2}.[0-9]{1,2})/.exec(fileContent);
        const groupMatch = match[1];
        const startIndex = match.index + "Cookie v".length;
        const endIndex = startIndex + groupMatch.length;
        return {
          startIndex: startIndex,
          endIndex: endIndex
        };
      };
      return bumpSourceFile("minor", targetFilename, findVersion).then(function() {
        return readFile(targetFilename);
      }).then(function(changedFileContents) {
        expect(changedFileContents).to.equal("/* JS Cookie v0.1.0 */");
      });
    });
  });
});
