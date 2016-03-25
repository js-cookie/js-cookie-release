const promisify = require("bluebird").promisify;
const writeFile = promisify(require("fs").writeFile);

module.exports = function(fileName, fileContent) {
  return writeFile(fileName, fileContent);
};
