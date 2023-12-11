const { inputData, example } = require("./data.js");

const data = inputData.split('\n').map(x => x.split(""))
const exampleData = example.split('\n').map(x => x.split(""))

const expandData = (array) => {
    const input = array; 
    // find all rows and all columns where every item is "." 
    let rows = []
    let cols = []
    for (let i = 0; i < input.length; i++) {
            if (input[i].every(item => item === ".")) {
                rows.push(i)
            }
        }
    for (let j = 0; j < input[0].length; j++) {
        if (input.every(item => item[j] === "." )) {
                cols.push(j)
            }
        }
    // add in new rows and columns at indeces (accounting for shifts)
    for (let k = 0; k < rows.length; k++) {
        input.splice(rows[k] + k, 0, input[rows[k] + k])
    }
    for (let l = 0; l < cols.length; l++) {
        input.forEach(row => {
            row.splice(cols[l]+l, 0, ".")
        })
    }
    return input
}

const calculateDistances = (array) => {
    const input = expandData(array); 
    let totalDistance = 0
    let coordinates = []
    input.forEach((line, lineIndex) => {
        line.forEach((item, itemIndex) => {
            if (item === "#") {
                coordinates.push([itemIndex, lineIndex])
            }
        })
    })
    coordinates.forEach((pair, index, arr) => {
        if (index !== coordinates.length - 1 ) {
        for (let i = 1; i < coordinates.length - index; i++)
            totalDistance += Math.abs(arr[index+i][0] - pair[0]) + Math.abs(arr[index+i][1] - pair[1])
        }
    })
return totalDistance
}

console.log(calculateDistances(data))
// console.log(calculateDistances(exampleData))


