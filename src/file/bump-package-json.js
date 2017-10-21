const root = require("app-root-path");
const writeFile = require("util").promisify(require("fs").writeFile);
const readFile = require("util").promisify(require("fs").readFile);

const bumpVersion = require(root + "/src/bump-version");

module.exports = async (bumpSpec, filePath) => {
  const fileContentAsJSON = JSON.parse(await readFile(filePath, "UTF-8"));
  fileContentAsJSON.version = bumpVersion(fileContentAsJSON.version, bumpSpec);
  await writeFile(filePath, JSON.stringify(fileContentAsJSON));
};
