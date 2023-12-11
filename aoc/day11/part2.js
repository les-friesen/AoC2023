const { inputData, example } = require("./data.js");

const data = inputData.split('\n').map(x => x.split(""))
const exampleData = example.split('\n').map(x => x.split(""))

const findEmptyRowsAndCols = (array) => {
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
    return [rows, cols]
}

const calculateDistances = (array, n) => {
    const input = array
    const [rows, cols] = findEmptyRowsAndCols(array); 
    let totalDistance = 0
    let coordinatesOfGalaxies = []
    input.forEach((line, lineIndex) => {
        line.forEach((item, itemIndex) => {
            if (item === "#") {
                coordinatesOfGalaxies.push([itemIndex, lineIndex])
            }
        })
    })
    coordinatesOfGalaxies.forEach((pair, index, arr) => {
        if (index !== coordinatesOfGalaxies.length - 1 ) {
        for (let i = 1; i < coordinatesOfGalaxies.length - index; i++) {
            //Vertical intersections could be before or after initial pair
            cols.forEach((col) => {
                if ((arr[index+i][0] > col && pair[0] < col) || (arr[index+i][0] < col && pair[0] > col)) {
                    totalDistance += (n - 1)
                }
            })
            //Horizontal intersections can only be after initial pair
            rows.forEach(row => {
                if ((arr[index+i][1] > row && pair[1] < row)) {
                    totalDistance += (n - 1) 
                }
            })
            totalDistance += Math.abs(arr[index+i][0] - pair[0]) + Math.abs(arr[index+i][1] - pair[1]) 
        }
        }
    })
return totalDistance
}


console.log(calculateDistances(exampleData, 2))
console.log(calculateDistances(exampleData, 10))
console.log(calculateDistances(exampleData, 100))
console.log(calculateDistances(data, 2))
console.log(calculateDistances(data, 1000000))