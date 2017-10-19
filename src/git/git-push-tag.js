module.exports = function(tagName, remoteName, repository) {
  return repository.getRemote(remoteName).then(function(remote) {
    return remote.push([`refs/tags/${tagName}:refs/tags/${tagName}`]);
  });
};
