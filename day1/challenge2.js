const lines = require('../utils').readLines(__dirname)
const frequencyDeltas = lines.map(n => Number(n))

let prevFrequency = 0
let index = 0

const visitedFrequencies = {}

while (index !== -1) {
  if (index === frequencyDeltas.length) {
    index = 0
  } 
  const frequency = prevFrequency + frequencyDeltas[index]

  if (visitedFrequencies[frequency.toString()]) {
    index = -1
  } else {
    visitedFrequencies[frequency.toString()] = true

    index++
  }

  prevFrequency = frequency
}

console.log(prevFrequency)