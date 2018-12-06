const lines = require('../utils').readLines(__dirname)

const charCounts = lines
  .map(line => Object.values(countCharacters(line)))

const hasTwoOfAChar = charCounts.filter(n => n.find(n => n === 2))
const hasThreeOfAChar = charCounts.filter(n => n.find(n => n === 3))

function countCharacters(str) {
  return str.split('').reduce((obj, char) => {
    obj[char] = obj[char] ? obj[char] + 1 : 1
    return obj
  }, {})
}

console.log(hasThreeOfAChar.length * hasTwoOfAChar.length)
