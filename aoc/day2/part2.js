const { inputData } = require("./data.js");

let dataArray = inputData.split("\n")
                .map(x => x.replace(/(\d+) green/g, '"green": $1')
                        .replace(/(\d+) red/g, '"red": $1')
                        .replace(/(\d+) blue/g, '"blue": $1')
                        .replace(/Game \d+:\s/, ""))
                .map(x => x.split("; ").map(y =>  JSON.parse(`{${y}}`)))

const findSum2 = (array) => {
    let sum = 0
    array.forEach((game) => {
        let cubeSet = [0, 0, 0]
        game.forEach(round => {
            if (round.red > cubeSet[0]) {
                cubeSet[0] = round.red
            }
            if (round.blue > cubeSet[1]) {
                cubeSet[1] = round.blue
            }
            if (round.green > cubeSet[2]) {
                cubeSet[2] = round.green
            }
        })
    let power = cubeSet[0]*cubeSet[1]*cubeSet[2]
    sum += power
    })
    return sum
}

console.log(findSum2(dataArray))
