const promisify = require("bluebird").promisify;
const fs = require("fs");
const writeFile = promisify(fs.writeFile);

const writeOperation = function(fileName, fileContent) {
  return writeFile(fileName, fileContent);
};

writeOperation.sync = function(fileName, fileContent) {
  fs.writeFileSync(fileName, fileContent);
};

module.exports = writeOperation;
