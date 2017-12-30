const fs = require('fs-extra')
const path = require('path')
const execSync = require('child_process').execSync
const exec = require('child_process').exec
const appRoot = require('app-root-path')
const recursive = require('recursive-readdir')
const utils = require('./utils')

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
 * @param cb
 */
const extractScript = (cloneDir, cb) => {
  recursive(cloneDir, [], cb)
}

let bsbCommand
try {
  bsbCommand = require.resolve('bs-platform/bin/bsb.exe')
} catch (e) {
  bsbCommand = `bsb`
}

const bsb = (() => {
  switch (utils.platform()) {
    case 'darwin':
      return `${bsbCommand} -make-world -color`
    case 'linux':
      return `script --return -qfc "${bsbCommand} -make-world -color" /dev/null`
    case 'wsl':
      return `${bsbCommand} -make-world`
    default:
      return `${bsbCommand} -make-world`
  }
})()

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
  const srcDir = `${appRoot}/${map.sourceRoot}`
  const srcFile = `${srcDir}/${name}`
  const cloneDir = 'src-cloned'
  const cloneFullPath = path.join(__dirname, cloneDir)
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
  syncFiles(srcDir, cloneFullPath, () => {
    extractScript(cloneFullPath, (err, files) => {
      console.log('checking file ', files, err)
      // Output .re into compiled/sourcePath<i.e. src/App.re>
      fs.outputFileSync(path.join(__dirname, `compiled/${srcFile.replace('vue', 're')}`), source)
      // Output arbitary bsconfig and override existing one
      fs.outputJsonSync(path.join(__dirname, 'bsconfig.json'), bsconfig)
      // Execute bsb
      execSync(bsb, { cwd: __dirname })
      // Return compiled js under lib/js/compiled
      const result = fs.readFileSync(path.join(__dirname, `lib/js/compiled/${sourcePath.replace('vue', 'js')}`), 'utf8')
      return result
    })
  })


};
