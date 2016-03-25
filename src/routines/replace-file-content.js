const root = require("app-root-path");

const readFile = require(root + "/src/utilities/read-file");
const writeFile = require("bluebird").promisify(require("fs").writeFile);

module.exports = function(fileName, replace) {
  return readFile(fileName, "utf-8").then(function(fileContent) {
    const replacedContent = replace(fileContent);
    return writeFile(fileName, replacedContent);
  });
};
