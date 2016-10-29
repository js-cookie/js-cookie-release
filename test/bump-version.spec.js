const root = require("app-root-path");
const bumpVersion = require(root + "/src/bump-version");
const expect = require("chai").expect;

describe("bump-version", function() {
  it("should bump 'major', 'minor' and 'patch' versions", function() {
    expect(bumpVersion("0.0.0", "patch")).to.equal("0.0.1");
    expect(bumpVersion("0.0.0", "minor")).to.equal("0.1.0");
    expect(bumpVersion("0.0.0", "major")).to.equal("1.0.0");
  });
});
