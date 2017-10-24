# JS Cookie Release API

Release routines for JavaScript Cookie library

## Functions

#### `Promise bumpPackageJSON(String bumpSpec, String filePath)`

Bumps the "version" property from a list of file paths that matches the [JSON](http://json.org/) spec.

#### `Promise gitCommit(String message, NodeGitRepository gitRepository)`

Add all the changes to the staging area and create a commit to the given repository.

## Release Steps

* Run `npm run release <bumpSpec>`, where `bumpSpec` is either `patch`, `minor` or `major`
* Run `npm publish ./`
