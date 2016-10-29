module.exports = function gitTag(tagName, commitObjectId, repository) {
  return repository.createTag(commitObjectId, tagName, "");
};