const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;

module.exports = function(source, map) {
  const name = map.sources[0]
  const sourcePath = `${map.sourceRoot}/${name}`


  const conf = {
    name : "reason-vue",
    sources : [
      { dir: `compiled/${map.sourceRoot}` }
    ],
    refmt: 3,
    "bsc-flags": ["-bs-no-version-header"]
  }

  fs.outputFileSync(path.join(__dirname, `compiled/${sourcePath.replace('vue', 're')}`), source)
  fs.outputJsonSync(path.join(__dirname, 'bsconfig.json'), conf)
  execSync('bsb', { cwd: __dirname })
  return fs.readFileSync(path.join(__dirname, `lib/js/compiled/${sourcePath.replace('vue', 'js')}`), 'utf8')
};
