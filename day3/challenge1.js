const lines = require('../utils').readLines(__dirname)
const grid = {}

lines.forEach(line => {
  const [id, AT, coords, size] = line.replace(':', '').split(' ')
  const [width, height] = size.split('x').map(Number)
  const [X, Y] = coords.split(',').map(Number)

  for (let j = Y; j < Y + height; j++) {
    for (let i = X; i < X + width; i++) {
      const key = `${i},${j}`
      if (grid[key]) {
        grid[key]++
      } else {
        grid[key] = 1
      }
    }
  }
})

const biggerThanTwo = Object.values(grid).filter(n => n >= 2).length
console.log(biggerThanTwo)

