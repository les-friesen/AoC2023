const { inputData, example } = require("./data.js");

const data = inputData.split("\n").map(x => x.split(""))
const exampleData = example.split("\n").map(x => x.split(""))

const findStart = (arr) => {
    let startCoordinates = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === "S") {
                startCoordinates = [i, j]
                break; 
            }
        }
    }
    return startCoordinates
}

const findPath = (arr) => {
    let [row, col] = findStart(arr)
    let steps = 1;
    let dirOfMove = ""

    //Find first step away from S - (Trying first N, then E, then S)

    if (arr[row-1][col] === "F" || arr[row-1][col] === "7" || arr[row-1][col] === "|") {
        row = row-1
        dirOfMove = "N"
    } else if (arr[row][col+1] === "-" || arr[row][col+1] === "7" ||  arr[row][col+1] === "J") {
        col = col+1
        dirOfMove = "E"
    } else if (arr[row+1][col] === "|" || arr[row+1][col] === "L" || arr[row+1][col] === "J") {
        row = row+1
        dirOfMove = "S"
    }

    // Go through Loop until back at S while counting steps. 

    while (arr[row][col] !== "S") {
        steps++
        if (arr[row][col] === "|") {
            if (dirOfMove === "S") {
                row++    
            } else if (dirOfMove === "N") {
                row--
            }
        } else if (arr[row][col] === "-") {
            if (dirOfMove === "E") {
                col++
            } else if (dirOfMove === "W") {
                col--
            }
        } else if (arr[row][col] === "L") {
            if (dirOfMove === "S") {
                dirOfMove = "E"
                col++
            } else if (dirOfMove === "W") {
                dirOfMove = "N"
                row--
            }
        } else if (arr[row][col] === "J") {
            if (dirOfMove === "S") {
                dirOfMove = "W"
                col--
            } else if (dirOfMove === "E") {
                dirOfMove = "N"
                row--
            }
        } else if (arr[row][col] === "7") {
            if (dirOfMove === "E") {
                dirOfMove = "S"
                row++
            } else if (dirOfMove === "N") {
                dirOfMove = "W"
                col--
            }
        } else if (arr[row][col] === "F") {
            if (dirOfMove === "W") {
                dirOfMove = "S"
                row++
            } else if (dirOfMove === "N") {
                dirOfMove = "E"
                col++
            }
        }
    }
    return steps / 2
}

console.log(findPath(data))