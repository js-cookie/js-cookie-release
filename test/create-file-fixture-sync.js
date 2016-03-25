const root = require("app-root-path");

const deleteFile = require(root + "/src/utilities/delete-file");
const writeFile = require(root + "/src/utilities/write-file");

module.exports = function(fileName, contents) {
  writeFile.sync(fileName, contents);
  return function removeFileFixtureSync() {
    deleteFile.sync(fileName);
  };
};
