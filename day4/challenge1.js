const unsortedLines = require('../utils').readLines(__dirname)
const lines = unsortedLines.sort().map(line => line.split(' '))
// console.log(lines)
// const lines = [
//   "[1518-11-01 00:00] Guard #10 begins shift",
//   "[1518-11-01 00:05] falls asleep",
//   "[1518-11-01 00:25] wakes up",
//   "[1518-11-01 00:30] falls asleep",
//   "[1518-11-01 00:55] wakes up",
//   "[1518-11-01 23:58] Guard #99 begins shift",
//   "[1518-11-02 00:40] falls asleep",
//   "[1518-11-02 00:50] wakes up",
//   "[1518-11-03 00:05] Guard #10 begins shift",
//   "[1518-11-03 00:24] falls asleep",
//   "[1518-11-03 00:29] wakes up",
//   "[1518-11-04 00:02] Guard #99 begins shift",
//   "[1518-11-04 00:36] falls asleep",
//   "[1518-11-04 00:46] wakes up",
//   "[1518-11-05 00:03] Guard #99 begins shift",
//   "[1518-11-05 00:45] falls asleep",
//   "[1518-11-05 00:55] wakes up"
// ].map(line => line.split(' '))
const SLEEP_SYMBOL = '#'
const AWAKE_SYMBOL = '.'
const sleepRecords = {}
let currentGuard = null
let sleepStartTime = null

lines.forEach(line => {
  if (line[3].startsWith('#')) { // shift start
    currentGuard = line[3]
    // possibly build in safeguards for not awaking guards
  } else if (line[2] === 'falls') { // falls asleep
    sleepStartTime = line[1].replace(/00\:|\]/g, '')
    // console.log(sleepStartTime)
  } else if (line[2] === 'wakes') { // wakes up
    const sleepEndTime = line[1].replace(/00\:|\]/g, '')
    const sleepDuration = Number(sleepEndTime) - Number(sleepStartTime)
    const pre = AWAKE_SYMBOL.repeat(Number(sleepStartTime))
    const sleep = SLEEP_SYMBOL.repeat(sleepDuration)
    const post = AWAKE_SYMBOL.repeat(60 - pre.length - sleep.length)
    const record = pre + sleep + post
    
    sleepRecords[currentGuard] = sleepRecords[currentGuard] ? sleepRecords[currentGuard].concat(record) : [record]
    sleepStartTime = null
  } else { // ??????
    console.log("-----------", line)
  }
})

const mostSleepyGuard = getMostSleepingGuard(sleepRecords)
const mostSleptMinute = getMostSleptMinute(mostSleepyGuard.sleepRecord)
console.log(mostSleepyGuard)
console.log(mostSleptMinute)
console.log(Number(mostSleepyGuard.id.replace('#', '')) * mostSleptMinute)

function getMostSleptMinute(sleepRecord) {
  let max = 0;
  let maxPosition
  for (let i = 0; i < sleepRecord[0].length; i++) {
    let currentAtPos = 0
    for (let j = 0; j < sleepRecord.length; j++) {
      if (sleepRecord[j].slice(i, i + 1) === SLEEP_SYMBOL) {
        currentAtPos++
      }
    }

    if (currentAtPos > max) {
      max = currentAtPos
      maxPosition = i
    }
  }

  return maxPosition
}

function getMostSleepingGuard (sleepRecords) {
  let mostSleepyGuard = null
  Object.keys(sleepRecords).forEach(id => { 
    const sleepRecord = sleepRecords[id]
    const amountOfSleep = sleepRecord.join('').split('').filter(x => x === SLEEP_SYMBOL).length
    if (!mostSleepyGuard || amountOfSleep > mostSleepyGuard.amountOfSleep) {
      mostSleepyGuard = {
        amountOfSleep,
        id,
        sleepRecord,
      }
    }
  })
  return mostSleepyGuard
}
// console.log(sleepRecords)
// read inputs
// sort by date

// find for each guard how many minutes they have been asleep
// most asleep x id is the answer