const pushover = require("pushover");
const root = require("app-root-path");
const http = require("http");
const Promise = require("bluebird");

const resolveGitDirectoryFixture = require(root + "/test/fixture/resolve-git-directory-fixture");

let nextPort = 50000;

module.exports = function() {
  return new Promise(function(resolve) {
    const repos = pushover(resolveGitDirectoryFixture());
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
