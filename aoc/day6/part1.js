const { inputData } = require("./data.js");

const dataArray = inputData.split(/\n/).map(line => line.replace(/[a-zA-Z:]+/g, "").trim().split(/\s+/))

const pairs = dataArray[0].map((time, index) => [+time, +dataArray[1][index]])

// pairs = [ [ 42, 284 ], [ 68, 1005 ], [ 69, 1122 ], [ 85, 1341 ] ]

const findWays = () => {
    let raceTotals =[]
    pairs.forEach((pair) => {
        let raceWays = 0
        for (let i = 1; i < pair[0]; i++) {
            const distance = (pair[0] - i)*i
            if (distance > pair[1]) {
                raceWays++
            }
        }
        raceTotals.push(raceWays)
    })
    return raceTotals.reduce((a,b) => a*b, 1)
}

console.log(findWays())

