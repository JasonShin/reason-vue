// Identity loader
const fs = require('fs')
const path = require('path')
module.exports = function(source, sourcemap) {
  // Write bundle.re into a source
  console.log(source)
  console.log(sourcemap)
  fs.writeFileSync(path.join(__dirname, 'bundle.re'), source)
  return source
};
