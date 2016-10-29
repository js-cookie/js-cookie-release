const root = require("app-root-path");
const Promise = require("bluebird");
const updateJSON = Promise.promisify(require("json-update").update);
const loadJSON = Promise.promisify(require("json-update").load);

const bumpVersion = require(root + "/src/bump-version");

module.exports = function(bumpSpec, fileNames) {
  const promisesToBumpFiles = fileNames.map(function(fileName) {
    return loadJSON(fileName)
    .then(function(fileContent) {
      return updateJSON(fileName, {
        version: bumpVersion(fileContent.version, bumpSpec)
      });
    });
  });
  return Promise.join(promisesToBumpFiles);
};
