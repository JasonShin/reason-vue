const R = require('ramda')
const fluture = require('fluture')
const fs = require('fs-extra')
const path = require('path')
const recursive = require('recursive-readdir')
const execSync = require('child_process').execSync
const exec = require('child_process').exec
const appRoot = require('app-root-path')
const utils = require('./utils')
const Future = fluture.Future

let bsbCommand
try {
  bsbCommand = require.resolve('bs-platform/bin/bsb.exe')
} catch (e) {
  bsbCommand = `bsb`
}

/**
 * BSB command as string
 */
const bsb = (() => {
  switch (utils.platform()) {
    case 'darwin':
      return `script -q /dev/null ${bsbCommand} -make-world -color`
    case 'linux':
      return `script --return -qfc "${bsbCommand} -make-world -color" /dev/null`
    case 'wsl':
      return `${bsbCommand} -clean-world -make-world`
    default:
      return `${bsbCommand} -clean-world -make-world`
  }
})()

/**
 * Extract <script> from each vue files and put it into corresponding .js files
 * @param cloneFullPath
 * @param cb
 */
const getFiles = ({ cloneFullPath }) =>
  new Future((rej, res) => {
    recursive(cloneFullPath, [], (err, files) => {
      if (err) {
        return rej(err)
      }
      res({ files })
    })
  }
)

/**
 * One time command to sync files between two locations src and dest
 * @param srcDir
 * @param cloneDir
 * @param cb
 */
const syncFiles = ({srcDir, cloneDir, cloneFullPath}) => new Future((rej, res) => {
  exec(`sync-files ${srcDir} ${cloneFullPath}`, (err) => {
    if (err) {
      rej(err)
    }
    res({ cloneDir, cloneFullPath })
  })
})

/**
 * @param files
 * @param cb
 * @returns {Promise.<*[]>}
 */
const extractScripts = ({ files }) =>
  new Future((rej, res) => {
    const reFiles = files.filter(x => x.match(/\.vue$/g))
    const futures = reFiles.map((f) =>
      new Future((rej2, res2) => {
        const writeJS = R.compose(
          // 1. Extract script section from content
          // 2. Parse given file path of .vue to .re
          // 3. Write the extracted reasonml to new .re path
          R.chain(({ filePath, content }) =>
            new Future((rej3, res3) => {
              const script = utils.getScript(content)
              const rePath = utils.getFilePath(filePath, '.re')
              fs.writeFile(rePath, script, (err) => {
                if (err) {
                  return rej3(err)
                }
                res3(null)
              })
            }
          )),
          // Read given re file
          (filePath) =>
            new Future((rej3, res3) => {
              fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                  rej3(err)
                }
                res3({ filePath, content })
              })
            }
          )
        )
        writeJS(f).fork(rej2, res2)
      }
    ))
    R.sequence(Future.of, futures)
      .fork(rej, res)
  }
)

const executeBSB = () =>
  new Future((rej, res) => {
    console.log('executing bsb')
    exec(bsb, { cwd: __dirname }, (err) => {
      if (err) {
        rej(err)
      }
      console.log('executed bsb')
      res(null)
    })
  })

const writeConfig = ({ bsconfig }) =>
  new Future((rej, res) => {
    fs.outputJson(
      path.join(__dirname, 'bsconfig.json'),
      bsconfig,
      (err) => {
        if (err) {
          rej(err)
        }
        res(null)
      }
    )
  })


/**
 * What needs to happen
 * 1) When any change is detected
 * @returns {*}
 */

module.exports = function(content) {
  this.cacheable && this.cacheable()
  console.log('checking API contents')
  console.log('resourcePath: ', this.resourcePath)
  console.log('checking content', content)
  // Webpack inits
  /* this.cacheable && this.cacheable()
  const callback = this.async()

  // Constants
  const srcDir = this.context
  const cloneDir = 'src-cloned'
  const cloneFullPath = path.join(__dirname, cloneDir)
  const bsconfig = {
    name : "reason-vue",
    sources : [
      {
        dir: cloneDir,
        subdirs: true
      },
    ],
    'package-specs': {
      module: 'commonjs',
      'in-source': true
    },
    // TODO: Find why refmt: 3 causes an error
    // refmt: 3,
    "bsc-flags": ["-bs-no-version-header"]
  }
  R.compose(
    R.chain(() => getFiles({ cloneFullPath })),
    // R.chain(executeBSB),
    (props) => {
      console.log('finished writing config')
      return props
    },
    R.chain(() => writeConfig({ bsconfig })),
    R.chain(extractScripts),
    R.chain(() => getFiles({ cloneFullPath })),
    () => syncFiles({srcDir, cloneDir, cloneFullPath})
  )()
    .fork(
      (err) => {
        callback(err)
      },
      (results) => {
        callback(results)
      }
    )*/
  return 'let test = "yo";'

}
