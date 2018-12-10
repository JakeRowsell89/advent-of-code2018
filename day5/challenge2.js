const polymer = require('../utils').readLines(__dirname)[0]

const unitsMatch = (unit1, unit2) => unit1.toLowerCase() === unit2.toLowerCase()
const chargesOppose = (unit1, unit2) => unitsMatch(unit1, unit2) && unit1 !== unit2

const uniqueUnits = Array.from(new Set(polymer.toLowerCase().split('')))

const shortestUnit = uniqueUnits.map(unit => {
  const regex = new RegExp(unit, 'gi')
  const cleanedPolymer = polymer.replace(regex, '')
  const collapsedPolymer = collapsePolymer(cleanedPolymer.split(''))

  return { 
    collapsedPolymer,
    unit
  }
}).sort((x, y) => x.collapsedPolymer.length > y.collapsedPolymer.length).slice(0, 1)


console.log('Shortest polymer:', shortestUnit.collapsedPolymer.length)

function collapsePolymer (polymerInput) {
  let polymer = polymerInput
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

  return polymer.join('')
}
