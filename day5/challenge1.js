const polymer = require('../utils').readLines(__dirname)[0].split('')

const unitsMatch = (unit1, unit2) => unit1.toLowerCase() === unit2.toLowerCase()
const chargesOppose = (unit1, unit2) => unitsMatch(unit1, unit2) && unit1 !== unit2

let index = 0
let prevPolymerLength = polymer.length
while (index < polymer.length - 1) {
  if (chargesOppose(polymer[index], polymer[index + 1])) {
    polymer.splice(index, 2)
  }
  index++

  if (index >= polymer.length - 1) {
    if (prevPolymerLength !== polymer.length) {
      index = 0
      prevPolymerLength = polymer.length
    }
  }
}
console.log('Resultant polymer :', polymer.join('').length)
console.log(polymer.join(''))