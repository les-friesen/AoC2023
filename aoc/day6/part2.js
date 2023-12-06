const { inputData } = require("./data.js");

const pair = inputData.split(/\n/).map(line => line.replace(/[^\d]+/g, "")).map(Number)

const findWays = () => {
        let raceWays = 0
        for (let i = 1; i < pair[0]; i++) {
            const distance = (pair[0] - i)*i
            if (distance > pair[1]) {
                raceWays++
            }
        }
    return raceWays
}

console.log(findWays())