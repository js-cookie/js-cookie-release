const root = require("app-root-path");
const writeFile = require("util").promisify(require("fs").writeFile);
const readFile = require("util").promisify(require("fs").readFile);

const bumpVersion = require(root + "/src/bump-version");

module.exports = async (bumpSpec, filePath) => {
  const VERSION_KEY_VALUE_REGEX = /"version":( +)?"(.+)"/;
  const fileContent = await readFile(filePath, "UTF-8");
  const matchedVersion = fileContent.match(VERSION_KEY_VALUE_REGEX);
  if (matchedVersion === null) {
    throw new Error(
      "Could not find 'version' property in package.json to bump"
    );
  }
  const version = matchedVersion[2];
  const bumpedVersion = bumpVersion(version, bumpSpec);
  const replacedFileContent = fileContent.replace(
    VERSION_KEY_VALUE_REGEX,
    `"version":$1"${bumpedVersion}"`
  );
  await writeFile(filePath, replacedFileContent);
};
