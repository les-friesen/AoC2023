const { inputData, example } = require("./data.js");

const exampleData = example.split(/\n\n/)
                            .map(block => block.split(/\n/))

// console.log(exampleData)

const data = inputData.split(/\n\n/)
                    .map(block => block.split(/\n/))

const calculateScore = (array) => {
    //checking horizontal
    for (let i = 0; i < array.length; i ++) { 
        if (array[i] === array[i+1]) {
            if (i >= (array.length-1)/2) {
                if ((array.slice(i + 1).toString()) === (array.slice(i - ((array.length - i - 2)), i + 1).reverse().toString())) {
                    return 100*(i+1)
                }
            } else {
                if (array.slice(0, i+1).toString() === array.slice(i+1, i+i+2).reverse().toString()) {
                    return 100*(i+1)
                }  
            }
        }
    }
    
    for (let j = 0; j < array[0].length; j++) {  
        if (array.every(row => row[j] === row[j+1])) {
            if (j >= (array[0].length - 1)/2) {
                if (array.every((row) => {
                    return row.slice(j+1) === row.slice(j - (row.length - j - 2), j + 1).split("").reverse().join("") 
                })) {
                    return j + 1
                }
            } else {
                if (array.every((row) => {
                    return row.slice(0, j+1) === row.slice(j+1, j+j+2).split("").reverse().join("")
                })) {
                    return j + 1
                }
            }
        }            
        } 
    return 0 
    } 

const findTotal = (input) => {
    let count = 0
    input.forEach((set) => {
        count += calculateScore(set)
    })
    return count 
}

console.log(findTotal(data))