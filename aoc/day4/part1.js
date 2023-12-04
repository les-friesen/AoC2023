const { inputData } = require("./data.js");

const dataArray = inputData.split("\n").map(x => x.replace(/Card\s+\d+:\s+/g, "").split(" | ").map(y => y.split(/\s+/)))

const findTotal1 = (data) => {
    let sum = 0
    data.forEach((card) => {
        let matchingNumbers = 0
        card[0].forEach((winningNumber) => {
            if (card[1].includes(winningNumber)) {
                matchingNumbers++
            }
        })
    if (matchingNumbers > 0) {
    sum += 2**(matchingNumbers-1) 
    }
    })
return sum 
}

console.log(findTotal1(dataArray))