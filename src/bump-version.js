/*
 * Bump a given version according to semver 2.0.0:
 * http://semver.org/spec/v2.0.0.html
 */
module.exports = function(version, bumpSpec) {
  return version.split(".").map(Number).map(function(number, index) {
    if (index === ["major", "minor", "patch"].indexOf(bumpSpec)) {
      return number + 1;
    }
    return number;
  }).join(".");
};
