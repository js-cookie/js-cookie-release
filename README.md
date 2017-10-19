## Functions

#### `Promise bumpJSONFiles(String bumpSpec, Array filePaths)`

Bumps the "version" property from a list of file paths that matches the [JSON](http://json.org/) spec.  
Returns a `Promise` that will resolve once all files have been bumped.

#### `Promise gitCommit(String message, NodeGitRepository gitRepository)`

Adds all the changes to the staging area and create a commit to the given repository.  
Returns a `Promise` that will resolve once the commit has been created.

## Release Steps

* Run `npm run release <bumpSpec>`, where `bumpSpec` is either `patch`, `minor` or `major`
