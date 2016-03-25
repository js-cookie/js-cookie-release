const root = require("app-root-path");
const readFile = require("bluebird").promisify(require("fs").readFile);
const expect = require("expect.js");

const bumpSourceFile = require(root + "/src/routines/bump-source-file");
const createFileFixtureSync = require(root + "/test/create-file-fixture-sync");

describe("bump-source-file", function() {

  it("should bump the 'minor' version using Regular Expression", function() {
    const targetFilename = "bump-minor.js";
    const removeFileFixtureSync = createFileFixtureSync(targetFilename, "/* JS Cookie v0.0.0 */");
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
      return readFile(targetFilename, "utf-8");
    }).then(function(changedFileContents) {
      expect(changedFileContents).to.be("/* JS Cookie v0.1.0 */");
    }).finally(function() {
      removeFileFixtureSync();
    });
  });

});
