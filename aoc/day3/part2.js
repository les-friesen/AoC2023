const { inputData } = require("./data.js");

const array = inputData.split('\n')

const findTotal = (arr) => {
    let sum = 0
    let obj = {}
    arr.forEach((row, rowIndex, wholeArr) => {
        const regexp = /\d+/g;
        const matches = row.matchAll(regexp);
        const matchesArr = []
        for (const match of matches) {
            matchesArr.push([match[0], match.index])
        }
        matchesArr.forEach((x) => {
            if (rowIndex === 0) {
                for (let i = rowIndex; i <= rowIndex + 1; i++) {
                    for (let j = x[1] - 1; j <= x[1]+x[0].length; j++) {
                        if (wholeArr[i][j] === "*") {
                            !obj[`${i}-${j}`] ? obj[`${i}-${j}`] = [x[0]] : obj[`${i}-${j}`].push(x[0])
                        }
                    }
                }     
            } else if (rowIndex === wholeArr.length-1) {
                for (let i = rowIndex - 1; i <= rowIndex; i++) {
                    for (let j = x[1] - 1; j <= x[1]+x[0].length; j++) {
                        if (wholeArr[i][j] === "*") {
                            
                            !obj[`${i}-${j}`] ? obj[`${i}-${j}`] = [x[0]] : obj[`${i}-${j}`].push(x[0])
                        }
                    }
                }  
            } else {
                for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
                    for (let j = x[1] - 1; j <= x[1]+x[0].length; j++) {
                        if (wholeArr[i][j] === "*") {
                            !obj[`${i}-${j}`] ? obj[`${i}-${j}`] = [x[0]] : obj[`${i}-${j}`].push(x[0])
                        }
                    }
                }
            }
        })
    })
Object.values(obj).filter(values => values.length === 2).forEach(pair => {
    sum += pair[0]*pair[1]
})
return sum 
}

console.log(findTotal(array))