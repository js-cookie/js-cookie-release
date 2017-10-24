const expect = require("chai").expect;
const readFile = require("util").promisify(require("fs").readFile);
const writeFile = require("util").promisify(require("fs").writeFile);
const unlink = require("util").promisify(require("fs").unlink);

const bumpPackageJSON = require(require("app-root-path") + "/src/file/bump-package-json");

describe("Bump Package JSON", () => {

  it("bumps the patch version in the package.json", async () => {
    await writeFile("target-package.json", "{\"version\":\"0.0.0\"}");
    await bumpPackageJSON("patch", "target-package.json");
    const targetFileContent = await readFile("target-package.json", "UTF-8");
    expect(targetFileContent).to.equal("{\"version\":\"0.0.1\"}");
    await unlink("target-package.json");

    await writeFile("another-target-package.json", "{\"version\":\"0.0.0\"}");
    await bumpPackageJSON("patch", "another-target-package.json");
    const anotherTargetFileContent = await readFile("another-target-package.json", "UTF-8");
    expect(anotherTargetFileContent).to.equal("{\"version\":\"0.0.1\"}");
    await unlink("another-target-package.json");
  });

  it("keeps existing properties intact", async () => {
    await writeFile("target-package.json", "{\"existing\":1,\"version\":\"0.0.0\"}");
    await bumpPackageJSON("patch", "target-package.json");
    const bumpedFile = await readFile("target-package.json", "UTF-8");
    expect(bumpedFile).to.equal("{\"existing\":1,\"version\":\"0.0.1\"}");
    await unlink("target-package.json");
  });

  it("keeps existing spacing intact", async () => {
    await writeFile("target-package.json", "{ \"version\": \"0.0.0\" }");
    await bumpPackageJSON("patch", "target-package.json");
    const bumpedFile = await readFile("target-package.json", "UTF-8");
    expect(bumpedFile).to.equal("{ \"version\": \"0.0.1\" }");
    await unlink("target-package.json");
  });

  it("keep existing multiple spacing intact", async () => {
    await writeFile("target-package.json", "{ \"version\":  \"0.0.0\" }");
    await bumpPackageJSON("patch", "target-package.json");
    const bumpedFile = await readFile("target-package.json", "UTF-8");
    expect(bumpedFile).to.equal("{ \"version\":  \"0.0.1\" }");
    await unlink("target-package.json");
  });

});
