const promisify = require("bluebird").promisify;
const readFile = promisify(require("fs").readFile);

module.exports = function(fileName) {
  return readFile(fileName, "utf-8");
};
