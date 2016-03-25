const root = require("app-root-path");
const del = require("delete");

const writeFile = require(root + "/src/utilities/write-file");

module.exports = function(fileName, contents) {
  writeFile.sync(fileName, contents);
  return function removeFileFixtureSync() {
    del.sync(fileName);
  };
};
