const pushover = require("pushover");
const root = require("app-root-path");
const http = require("http");
const Promise = require("bluebird");

const resolveGitDirectory = require(root + "/test/dummy-data/resolve-git-test-directory");

let nextPort = 50000;

module.exports = function() {
  return new Promise(function(resolve) {
    const repos = pushover(resolveGitDirectory());
    const server = http.createServer(function(req, res) {
      repos.handle(req, res);
    });
    const listener = server.listen(nextPort += 1, "localhost", function listening() {
      resolve({
        listener: listener,
        close: function() {
          server.close();
        }
      });
    });
  });
};
