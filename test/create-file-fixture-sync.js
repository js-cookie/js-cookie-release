const write = require("write");
const del = require("delete");

module.exports = function(fileName, contents) {
  write.sync(fileName, contents);
  return function removeFileFixtureSync() {
    del.sync(fileName);
  };
};
