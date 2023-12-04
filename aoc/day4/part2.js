const { inputData } = require("./data.js");

const dataArray = inputData.split("\n").map(x => x.replace(/Card\s+\d+:\s+/g, "").split(/\s\|\s+/).map(y => y.split(/\s+/)))

const findTotal2 = (data) => {
    let cardQuantities = Array(data.length).fill(1)
    data.forEach((card, index, arr) => {
        let matchingNumbers = 0
        card[0].forEach((winningNumber) => {
            if (card[1].includes(winningNumber)) {
                matchingNumbers++
            }
        })
        if (matchingNumbers > 0) {
            for (let i = 1; i <= matchingNumbers; i++) {
                if (index + i < arr.length) {
                cardQuantities[index + i] += cardQuantities[index]
                }
            }
        }
    })
return cardQuantities.reduce((a,b) => a+b, 0)
}

console.log(findTotal2(dataArray))