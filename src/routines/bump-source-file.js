const root = require("app-root-path");

const readFile = require(root + "/src/utilities/read-file");
const writeFile = require(root + "/src/utilities/write-file");
const bumpVersion = require(root + "/src/utilities/bump-version");

module.exports = function(bumpSpec, fileName, findVersion) {
  return readFile(fileName).then(function(fileContent) {
    const versionLocator = findVersion(fileContent);
    const version = fileContent.substring(versionLocator.startIndex, versionLocator.endIndex);
    const bumpedVersion = bumpVersion(version, bumpSpec);
    const leftContent = fileContent.substring(0, versionLocator.startIndex);
    const rightContent = fileContent.substring(versionLocator.endIndex, fileContent.length);
    return writeFile(fileName, leftContent + bumpedVersion + rightContent);
  });
};
