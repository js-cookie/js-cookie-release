const fs = require("fs");

module.exports = {
  sync: function(fileName) {
    fs.unlink(fileName);
  }
};
