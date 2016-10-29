module.exports = function(remoteName, repository) {
  return repository.getRemote(remoteName).then(function(remote) {
    return remote.push(["refs/heads/master:refs/heads/master"]);
  });
};