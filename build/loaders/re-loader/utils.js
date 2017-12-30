const os = require('os')
const cheerio = require('cheerio')
const jsmin = require('jsmin').jsmin

function platform() /*: 'darwin' | 'linux' | 'wsl' | null */ {
  const isWSL = () => {
    const release = os.release()
    return (
      release.substring(release.length - 'Microsoft'.length) === 'Microsoft'
    )
  }

  if (os.platform() === 'darwin') return 'darwin'
  if (os.platform() === 'linux' && isWSL()) return 'wsl'
  if (os.platform() === 'linux') return 'linux'
  return null
}


const getScript = (strContent) => {
  const $ = cheerio.load(strContent)
  const script = $('script').html()
  return jsmin(script)
}

/**
 * Replaces any file extension to .js
 * @param filePath
 * @param ext
 */
const getFilePath = (filePath, ext) => {
  return filePath.replace(/\.\w+$/g, ext)
}

module.exports = {
  platform,
  getScript,
  getFilePath
}
