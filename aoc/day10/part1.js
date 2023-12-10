const { inputData, example } = require("./data.js");

const data = inputData.split("\n").map(x => x.split(""))
const exampleData = example.split("\n").map(x => x.split(""))

const findStart = (arr) => {
    let startCoordinates = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === "S") {
                startCoordinates.push(i)
                startCoordinates.push(j)
                break; 
            }
        }
    }
    return startCoordinates
}

console.log(findStart(exampleData))

const findPath = (arr) => {
    let [row, col] = findStart(arr)
    // let row = findStart(arr)[0]
    // let col = findStart(arr)[1]
    let steps = 0;
    // let currentChar = "S"
    let dirOfMove = ""

    //Find first step away from S - (Trying first N, then E, then S)

    if (arr[row-1][col] === "F" || arr[row-1][col] === "7" || arr[row-1][col] === "|") {
        row = row-1
        steps++
        dirOfMove = "N"
    } else if (arr[row][col+1] === "-" || arr[row][col+1] === "7" ||  arr[row][col+1] === "J") {
        col = col+1
        steps++
        dirOfMove = "E"
    } else if (arr[row+1][col] === "|" || arr[row+1][col] === "L" || arr[row+1][col] === "J") {
        row = row+1
        steps++
        dirOfMove = "S"
    }

    // Go through Loop until back at S while counting steps. 

    while (arr[row][col] !== "S") {
        if (arr[row][col] === "|") {
            if (dirOfMove === "S") {
                row++
                steps++
            } else if (dirOfMove === "N") {
                row--
                steps++
            }
        } else if (arr[row][col] === "-") {
            if (dirOfMove === "E") {
                col++
                steps++
            } else if (dirOfMove === "W") {
                col--
                steps++
            }
        } else if (arr[row][col] === "L") {
            if (dirOfMove === "S") {
                dirOfMove = "E"
                col++
                steps++
            } else if (dirOfMove === "W") {
                dirOfMove = "N"
                row--
                steps++
            }
        } else if (arr[row][col] === "J") {
            if (dirOfMove === "S") {
                dirOfMove = "W"
                col--
                steps++
            } else if (dirOfMove === "E") {
                dirOfMove = "N"
                row--
                steps++
            }
        } else if (arr[row][col] === "7") {
            if (dirOfMove === "E") {
                dirOfMove = "S"
                row++
                steps++
            } else if (dirOfMove === "N") {
                dirOfMove = "W"
                col--
                steps++
            }
        } else if (arr[row][col] === "F") {
            if (dirOfMove === "W") {
                dirOfMove = "S"
                row++
                steps++
            } else if (dirOfMove === "N") {
                dirOfMove = "E"
                col++
                steps++
            }
        }
    }
    return steps / 2
}

console.log(findPath(data))