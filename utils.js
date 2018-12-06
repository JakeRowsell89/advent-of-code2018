const fs = require('fs')
const path = require('path')
const readLines = (dir, file = 'inputs') => fs.readFileSync(path.resolve(dir, file), {encoding: 'utf8'}).split('\n')

module.exports = { 
  readLines,
}