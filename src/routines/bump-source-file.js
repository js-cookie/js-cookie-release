const root = require("app-root-path");
const promisify = require("bluebird").promisify;

const writeFile = promisify(require("fs").writeFile);

const readFile = require(root + "/src/utilities/read-file");
const bumpVersion = require(root + "/src/utilities/bump-version");

module.exports = function(bumpSpec, fileName, findVersion) {
  return readFile(fileName, "utf-8").then(function(fileContent) {
    const versionLocator = findVersion(fileContent);
    const version = fileContent.substring(versionLocator.startIndex, versionLocator.endIndex);
    const bumpedVersion = bumpVersion(version, bumpSpec);
    const leftContent = fileContent.substring(0, versionLocator.startIndex);
    const rightContent = fileContent.substring(versionLocator.endIndex, fileContent.length);
    return writeFile(fileName, leftContent + bumpedVersion + rightContent, "utf-8");
  });
};
