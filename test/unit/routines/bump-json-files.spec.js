const root = require("app-root-path");
const expect = require("expect.js");
const Promise = require("bluebird");
const loadJSON = Promise.promisify(require("json-update").load);

const bumpJSONFiles = require(root + "/src/routines/bump-json-files");

const write = require("write");
const del = require("delete");
const createFileFixtureSync = function(fileName, contents) {
  write.sync(fileName, contents);
  return function removeFileFixtureSync() {
    del.sync(fileName);
  };
};

describe("bump-json-files", function() {

  it("should bump the 'minor' version for a system JSON file", function(done) {
    const targetFilename = root + "/test/routines/bump-minor.json";
    const removeFileFixtureSync = createFileFixtureSync(targetFilename, JSON.stringify({
      version: "0.0.0"
    }));

    bumpJSONFiles("minor", [targetFilename]).then(function() {
      return loadJSON(targetFilename);
    }).then(function(targetFile) {
      expect(targetFile).to.have.property("version", "0.1.0");
      removeFileFixtureSync();
      done();
    })
    .catch(function(err) {
      removeFileFixtureSync();
      done(err);
    });
  });

});