const fs = require('fs-extra')
const path = require('path')
const execSync = require('child_process').execSync
const exec = require('child_process').exec
const appRoot = require('app-root-path')
const recursive = require('recursive-readdir')

/**
 * One time command to sync files between two locations src and dest
 * @param srcDir
 * @param cloneDir
 * @param cb
 */
const syncFiles = (srcDir, cloneDir, cb) => {
  exec(`sync-files ${srcDir} ${cloneDir}`, cb)
}

/**
 * Extract <script> from each vue files and put it into corresponding .js files
 * @param cloneDir
 */
const extractScript = (cloneDir, cb) => {
  recursive(cloneDir, [], cb)
}

/**
 * What needs to happen
 * 1) When any change is detected
 * @param source
 * @param map
 * @returns {*}
 */

module.exports = function(source, map) {
  // Webpack inits
  this.cacheable && this.cacheable()

  // Constants
  const name = map.sources[0]
  const srcDir = `${map.sourceRoot}/${name}`
  const cloneDir = path.join(__dirname, 'src-cloned')
  const bsconfig = {
    name : "reason-vue",
    sources : [
      {
        dir: cloneDir,
        subdirs: true
      }
    ],
    refmt: 3,
    "bsc-flags": ["-bs-no-version-header"]
  }

  // Tasks
  syncFiles(srcDir, cloneDir, () => {
    console.log('syncing files')
    extractScript(cloneDir, (err, files) => {
      // Output .re into compiled/sourcePath<i.e. src/App.re>
      fs.outputFileSync(path.join(__dirname, `compiled/${sourcePath.replace('vue', 're')}`), source)
      // Output arbitary bsconfig and override existing one
      fs.outputJsonSync(path.join(__dirname, 'bsconfig.json'), bsconfig)
      // Execute bsb
      execSync('bsb', { cwd: __dirname })
      // Return compiled js under lib/js/compiled
      const result = fs.readFileSync(path.join(__dirname, `lib/js/compiled/${sourcePath.replace('vue', 'js')}`), 'utf8')
      return result
    })
  })


};
