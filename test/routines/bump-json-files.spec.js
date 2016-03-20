const root = require("app-root-path");
const expect = require("expect.js");
const Promise = require("bluebird");
const loadJSON = Promise.promisify(require("json-update").load);

const bumpJSONFiles = require(root + "/src/routines/bump-json-files");

describe("bump-json-files", function() {
  it("should bump the 'minor' version for a system JSON file", function(done) {
    bumpJSONFiles("minor", [root + "/test/routines/bump-json-files/bump-minor.json"])
    .then(function() {
      return loadJSON(root + "/test/routines/bump-json-files/bump-minor.json");
    })
    .then(function(targetFile) {
      expect(targetFile).to.have.property("version", "0.1.0");
      done();
    })
    .catch(done);
  });
});
