const { inputData } = require("./data.js");

const array = inputData.split('\n').map(x => x.replace(/[^\.\d]/g, "*"))

const findTotal = (arr) => {
    let sum = 0
    arr.forEach((row, rowIndex, wholeArr) => {
        const regexp = /\d+/g;
        const matches = row.matchAll(regexp);
        const matchesArr = []
        for (const match of matches) {
            matchesArr.push([match[0], match.index])
        }
        matchesArr.forEach((x) => {
            
            if (rowIndex === 0) {
                let isAdded = false
                for (let i = rowIndex; i <= rowIndex + 1; i++) {
                    for (let j = x[1] - 1; j <= x[1]+x[0].length + 1; j++) {
                        if (wholeArr[i][j] === "*") {
                            isAdded = true
                        }
                    }
                }
                if (isAdded) {
                    sum += Number(x[0])
                }
                
            } else if (rowIndex === wholeArr.length-1) {
                let isAdded = false
                for (let i = rowIndex - 1; i <= rowIndex; i++) {
                    for (let j = x[1] - 1; j <= x[1]+x[0].length; j++) {
                        if (wholeArr[i][j] === "*") {
                            isAdded = true
                        }
                    }
                }
                if (isAdded) {
                    sum += Number(x[0])
                }
                
            } else {
                let isAdded = false
                for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
                    for (let j = x[1] - 1; j <= x[1]+x[0].length; j++) {
                        if (wholeArr[i][j] === "*") {
                            isAdded = true
                        }
                    }
                }
                if (isAdded) {
                    sum += Number(x[0])
                }
            }
        })
    })
return sum 

}

console.log(findTotal(array))