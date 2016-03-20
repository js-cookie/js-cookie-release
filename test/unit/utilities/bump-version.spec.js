const root = require("app-root-path");
const bumpVersion = require(root + "/src/utilities/bump-version");
const expect = require("expect.js");

describe("bump-version", function() {
  it("should bump 'major', 'minor' and 'patch' versions", function() {
    expect(bumpVersion("0.0.0", "patch")).to.be("0.0.1");
    expect(bumpVersion("0.0.0", "minor")).to.be("0.1.0");
    expect(bumpVersion("0.0.0", "major")).to.be("1.0.0");
  });
});
