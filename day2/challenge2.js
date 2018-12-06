const lines = require('../utils').readLines(__dirname)

lines.forEach((line, index) => {
  for (let i = index + 1; i < lines.length; i++) {
    const lettersDifference = findLettersDifference(line, lines[i])
    if (lettersDifference === 1) {
      console.log('---')
      console.log(line)
      console.log(lines[i])
      console.log('Visual comparison ^')
    }
  }
})

function findLettersDifference (str1, str2) {
  let total = 0
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      total++
    }
  }
  return total
}

