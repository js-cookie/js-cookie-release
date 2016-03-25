const root = require("app-root-path");

const readFile = require(root + "/src/utilities/read-file");
const writeFile = require(root + "/src/utilities/write-file");

module.exports = function(fileName, replace) {
  return readFile(fileName).then(function(fileContent) {
    const replacedContent = replace(fileContent);
    return writeFile(fileName, replacedContent);
  });
};
