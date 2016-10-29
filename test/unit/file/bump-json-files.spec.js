const root = require("app-root-path");
const expect = require("chai").expect;
const Promise = require("bluebird");
const loadJSON = Promise.promisify(require("json-update").load);

const bumpJSONFiles = require(root + "/src/file/bump-json-files");
const createFileSync = require(root + "/test/dummy-data/create-file-sync");

describe("bump-json-files", function() {

  describe("Given a dummy file in JSON format", function() {
    const targetFilename = "bump-minor.json";
    let removeDummyJSONFileSync;

    beforeEach(function() {
      removeDummyJSONFileSync = createFileSync(targetFilename, JSON.stringify({
        version: "0.0.0"
      }));
    });

    afterEach(function() {
      removeDummyJSONFileSync();
    });

    it("should bump the 'minor' version attribute", function() {
      return bumpJSONFiles("minor", [targetFilename]).then(function() {
        return loadJSON(targetFilename);
      }).then(function(targetFile) {
        expect(targetFile).to.have.property("version", "0.1.0");
      });
    });
  });
});
