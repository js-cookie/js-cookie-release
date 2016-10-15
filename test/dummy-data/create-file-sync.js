const root = require("app-root-path");

const deleteFile = require(root + "/src/file/delete-file");
const writeFile = require(root + "/src/file/write-file");

module.exports = function(fileName, contents) {
  writeFile.sync(fileName, contents);
  return function removeFileSync() {
    deleteFile.sync(fileName);
  };
};
