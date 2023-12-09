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

const startNodes = lrMap.filter(x => x[0][2] === "A")

const countSteps = (start, num) => {
    let steps = num
    let current = start
    for (let i = 0; i < instructions.length; i++) {
        
        if (current[2] === "Z") {
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
return current[2] === "Z" ? steps : countSteps(current, steps)
}

const findTotal = () => {
    let lowestPaths = []

    startNodes.forEach(node => {
        const lowestPath = countSteps(node[0], 0)
        lowestPaths.push(lowestPath)
    })

    //find least common multiple 
    const findLCM = (numbers) => {
        const findGCD = (a, b)  => {
            return b === 0 ? a : findGCD(b, a % b);
        }
        const findLCMOfTwo = (a, b) => {
            return (a * b) / findGCD(a, b);
        }
        let lcm = numbers[0];
            for (let i = 1; i < numbers.length; i++) {
        lcm = findLCMOfTwo(lcm, numbers[i]);
        }
        return lcm;
        }
        
    return findLCM(lowestPaths)
} 

console.log(findTotal())