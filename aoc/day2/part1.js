const { inputData } = require("./data.js");

let dataArray = inputData.split("\n")
                .map(x => x.replace(/(\d+) green/g, '"green": $1')
                        .replace(/(\d+) red/g, '"red": $1')
                        .replace(/(\d+) blue/g, '"blue": $1')
                        .replace(/Game \d+:\s/, ""))
                .map(x => x.split("; ").map(y =>  JSON.parse(`{${y}}`)))

const findSum1 = (array) => {
    let sum = 0
    array.forEach((game, gameIndex) => {
        if (game.every( x => {
                return ((x.red <= 12 || x.red === undefined) && 
                        (x.green <= 13 || x.green === undefined) && 
                        (x.blue <= 14 || x.blue === undefined))
            })) {
            sum += gameIndex+1
        }
    })
    return sum 
}

console.log(findSum1(dataArray))
