// Identity loader
const fs = require('fs')
const path = require('path')
module.exports = function(source) {
  // Write bundle.re into a source
  fs.writeFileSync(path.join(__dirname, 'bundle.re'), source)
  return source
};
