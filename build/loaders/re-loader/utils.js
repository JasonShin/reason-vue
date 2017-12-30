const os = require('os')

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

module.exports = {
  platform
}
