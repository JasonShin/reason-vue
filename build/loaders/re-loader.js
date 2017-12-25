const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;



module.exports = function(source, map) {
  // File name
  const name = map.sources[0]
  // source path + filename <i.e. src/App.vue>
  const sourcePath = `${map.sourceRoot}/${name}`
  // Arbitary bsconfig
  const conf = {
    name : "reason-vue",
    sources : [
      { dir: `compiled/${map.sourceRoot}` }
    ],
    refmt: 3,
    "bsc-flags": ["-bs-no-version-header"]
  }
  // Output .re into compiled/sourcePath<i.e. src/App.re>
  fs.outputFileSync(path.join(__dirname, `compiled/${sourcePath.replace('vue', 're')}`), source)
  // Output arbitary bsconfig and override existing one
  fs.outputJsonSync(path.join(__dirname, 'bsconfig.json'), conf)
  // Execute bsb
  execSync('bsb', { cwd: __dirname })
  // Return compiled js under lib/js/compiled
  return fs.readFileSync(path.join(__dirname, `lib/js/compiled/${sourcePath.replace('vue', 'js')}`), 'utf8')
};
