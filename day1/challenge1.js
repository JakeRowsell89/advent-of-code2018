const lines = require('../utils').readLines(__dirname)
const n = lines.reduce((acc, cur) => acc + Number(cur), 0)
console.log(n)