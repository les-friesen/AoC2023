const { inputData } = require("./data.js");

const instructions = inputData.match(/[LR]+/g)[0]

const lrMap = inputData.replaceAll(" =", "")
                        .replaceAll("(", "")
                        .replaceAll(")", "")
                        .replaceAll(",", "")
                        .split("\n")
                        .splice(2)
                        .map(x => x.split(" "))

// data structure: [ 'DBQ', 'RTP', 'NBX' ]

const countSteps = (start, num) => {
    let steps = num
    let current = start
    for (let i = 0; i < instructions.length; i++) {
        if (current === "ZZZ") {
            break; 
        }
        if (instructions[i] === "L") {
            current = lrMap.find(x => x[0] === current)[1]
            steps++ 
        } 
        if (instructions[i] === "R") {
            current = lrMap.find(x => x[0] === current)[2]
            steps++
        }
    }
return current === "ZZZ" ? steps : countSteps(current, steps)
}

console.log(countSteps("AAA", 0))









