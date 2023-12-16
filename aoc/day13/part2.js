const { inputData, example } = require("./data.js");

const exampleData = example.split(/\n\n/)
                            .map(block => block.split(/\n/))

const data = inputData.split(/\n\n/)
                    .map(block => block.split(/\n/))

const calculateScore = (array) => {
    let scores = [] 
    //checking horizontal
    for (let i = 0; i < array.length; i ++) { 
        if (array[i] === array[i+1]) {
            if (i >= (array.length-1)/2) {
                if ((array.slice(i + 1).toString()) === (array.slice(i - ((array.length - i - 2)), i + 1).reverse().toString())) {
                    scores.push(100*(i+1))
                }
            } else {
                if (array.slice(0, i+1).toString() === array.slice(i+1, i+i+2).reverse().toString()) {
                    scores.push(100*(i+1))
                }  
            }
        }
    }

    // checking vertical
    for (let j = 0; j < array[0].length; j++) {     
        if (array.every(row => row[j] === row[j+1])) {
            if (j >= (array[0].length - 1)/2) {
                if (array.every((row) => {
                    return row.slice(j+1) === row.slice(j - (row.length - j - 2), j + 1).split("").reverse().join("") 
                })) {
                    scores.push(j + 1) 
                }
            } else {
                if (array.every((row) => {
                    return row.slice(0, j+1) === row.slice(j+1, j+j+2).split("").reverse().join("")
                })) {
                    scores.push(j + 1) 
                }
            }
        }            
        }  
        return scores
    } 

const findTotal = (input) => {
    let total = 0
    for (let set of input) {
        let matchFound = false
        for (let i = 0; i < set.length; i++) {
            for (let j = 0; j < set[0].length; j++) {
                if (set[i][j] === "#") {
                    let newSet = [...set]
                    newSet[i] = newSet[i].substring(0,j) + "." + newSet[i].substring(j+1);
                    // Make sure a new reflection line has been found that isn't equal to the old one
                    if (calculateScore(newSet)[0] > 0 && calculateScore(newSet).toString() !== calculateScore(set).toString()) {
                        // Filter out the old reflection line
                        total += calculateScore(newSet).filter(x => x !== calculateScore(set)[0])[0]
                        matchFound = true; 
                        break; 
                    }
                } else  if (set[i][j] === ".") {
                    let newSet = [...set]
                    newSet[i] = newSet[i].substring(0,j) + "." + newSet[i].substring(j+1);
                    if (calculateScore(newSet)[0] > 0 && calculateScore(newSet).toString() !== calculateScore(set).toString()) {
                        total += calculateScore(newSet).filter(x => x !== calculateScore(set)[0])[0]
                        matchFound = true; 
                        break;   
                    } 
                }
                if (matchFound) {
                    break; 
                }
            }
            if (matchFound) {
                break; 
            }
        }
    }
    return total
}

console.log(findTotal(data))