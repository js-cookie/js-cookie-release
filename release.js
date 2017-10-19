const Promise = require("bluebird");
const Git = require("nodegit");

const bumpJSONFiles = require("./src/file/bump-json-files");
const gitCommit = require("./src/git/git-commit");

let targetBumpSpec;
if (process.argv.includes("patch")) {
  targetBumpSpec = "patch";
}
if (process.argv.includes("minor")) {
  targetBumpSpec = "minor";
}
if (process.argv.includes("major")) {
  targetBumpSpec = "major";
}
if (!targetBumpSpec) {
  console.log("Invalid bump spec, use 'patch', 'minor' or 'major'");
  return;
}

const isFakeRun = process.argv.includes("fake");

let localRepo;

Promise.try(() => {
  console.log("Bumping package.json...");
  if (!isFakeRun) {
    return bumpJSONFiles(targetBumpSpec, ["package.json"]);
  }
}).then(() => {
  return Git.Repository.discover(".", 0, ".");
}).then((_localRepo) => {
  localRepo = _localRepo
  console.log("Found repository:", localRepo);
  console.log("Creating release commit...");
  if (isFakeRun) {
    return 'fake44ef0665e9e8e5fdf7c6bfcd61f95fe8b699';
  }
  return gitCommit("Release new version", localRepo);
}).then((commitObjectId) => {
  const tagName = commitObjectId && commitObjectId.substring(0, 8)
  const tagReferenceCommit = commitObjectId
  console.log("Creating tag:", tagName);
  if (!isFakeRun) {
    return gitTag(tagName, tagReferenceCommit, localRepo);
  }
});

// TODO Push the tag to the remote
// TODO Publish on NPM
