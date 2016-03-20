const root = require("app-root-path");
const expect = require("expect.js");
const Promise = require("bluebird");
const loadJSON = Promise.promisify(require("json-update").load);

const bumpJSONFiles = require(root + "/src/routines/bump-json-files");
const createFileFixtureSync = require(root + "/test/create-file-fixture-sync");

describe("bump-json-files", function() {

  it("should bump the 'minor' version for a system JSON file", function() {
    const targetFilename = root + "/test/routines/bump-minor.json";
    const removeFileFixtureSync = createFileFixtureSync(targetFilename, JSON.stringify({
      version: "0.0.0"
    }));
    return bumpJSONFiles("minor", [targetFilename]).then(function() {
      return loadJSON(targetFilename);
    }).then(function(targetFile) {
      expect(targetFile).to.have.property("version", "0.1.0");
    }).finally(function() {
      removeFileFixtureSync();
    });
  });

});
