const Git = require("nodegit");

module.exports = function(message, repository) {
  let getRepository = Git.Repository.open("./");
  if (repository) {
    getRepository = Promise.resolve(repository);
  }
  return getRepository.then(function(repository) {
    const author = Git.Signature.default(repository);
    const committer = Git.Signature.default(repository);
    return repository.createCommitOnHead([], author, committer, message);
  }).then((oid) => oid.tostrS());
};
