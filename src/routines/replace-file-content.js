const root = require("app-root-path");

const readFile = require(root + "/src/file/read-file");
const writeFile = require(root + "/src/file/write-file");

module.exports = function(fileName, replace) {
  return readFile(fileName).then(function(fileContent) {
    const replacedContent = replace(fileContent);
    return writeFile(fileName, replacedContent);
  });
};
