const lines = require('../utils').readLines(__dirname)
const grid = {}
const linesMap = {}

lines.forEach(line => {
  const [id, AT, coords, size] = line.replace(':', '').split(' ')
  const [width, height] = size.split('x').map(Number)
  const [X, Y] = coords.split(',').map(Number)
  linesMap[id] = line

  for (let j = Y; j < Y + height; j++) {
    for (let i = X; i < X + width; i++) {
      const key = `${i},${j}`
      if (grid[key]) {
        grid[key].value++
        grid[key].ids.push(id)
      } else {
        grid[key] = { value: 1, ids: [id]}
      }
    }
  }
})

const notOverlappingFieldIds = Object.values(grid).filter(n => n.value === 1).reduce((p, c) => {
  const id = c.ids[0]
  p[id] = id
  return p
}, {})

Object.keys(notOverlappingFieldIds).find(inputId => {
  const [id, AT, coords, size] = linesMap[inputId].replace(':', '').split(' ')
  const [width, height] = size.split('x').map(Number)
  const [X, Y] = coords.split(',').map(Number)

  let overlaps = false

  for (let j = Y; j < Y + height; j++) {
    for (let i = X; i < X + width; i++) {
      const key = `${i},${j}`

      overlaps = overlaps || grid[key].ids.length > 1
    }
  }

  if (!overlaps) {
    console.log('Not overlapping id:', id)
  }
})
// for each of those ID's check entire field doesn't contain other ids

