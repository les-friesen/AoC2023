const { inputData, example, example2, example3 } = require("./data.js");

const data = inputData.split("\n").map(x => x.split(""))
// const exampleData = example.split("\n").map(x => x.split(""))
// const exampleData2 = example2.split("\n").map(x => x.split(""))
// const exampleData3 = example3.split("\n").map(x => x.split(""))

const findStart = (arr) => {
    let startCoordinates = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === "S") {
                startCoordinates = [i,j]
                break; 
            }
        }
    }
    return startCoordinates
}

const findPath = (arr) => {
    let [row, col] = findStart(arr)
    let dirOfMove = ""
    let firstDir = ""

    //Find first step away from S - (Trying first N, then E, then S)

    if (arr[row-1][col] === "F" || arr[row-1][col] === "7" || arr[row-1][col] === "|") {
        row = row-1
        dirOfMove = "N"
        firstDir = "N"
    } else if (arr[row][col+1] === "-" || arr[row][col+1] === "7" ||  arr[row][col+1] === "J") {
        col = col+1
        dirOfMove = "E"
        firstDir = "E"
    } else if (arr[row+1][col] === "|" || arr[row+1][col] === "L" || arr[row+1][col] === "J") {
        row = row+1
        dirOfMove = "S"
        firstDir = "S"
    }

    // Go through Loop until back at S while counting steps. 

    while (arr[row][col] !== "S") {
        if (arr[row][col] === "|") {
            arr[row][col] = "V"
            if (dirOfMove === "S") {
                row++
            } else if (dirOfMove === "N") {
                row--
            }
        } else if (arr[row][col] === "-") {
            arr[row][col] = "H"
            if (dirOfMove === "E") {
                col++
            } else if (dirOfMove === "W") {
                col--
            }
        } else if (arr[row][col] === "L") {
            arr[row][col] = "H";
            if (dirOfMove === "S") {
                dirOfMove = "E"
                col++
            } else if (dirOfMove === "W") {
                dirOfMove = "N"
                row--
            }
        } else if (arr[row][col] === "J") {
            arr[row][col] = "H"
            if (dirOfMove === "S") {
                dirOfMove = "W"
                col--
            } else if (dirOfMove === "E") {
                dirOfMove = "N"
                row--
            }
        } else if (arr[row][col] === "7") {
            arr[row][col] = "V"
            if (dirOfMove === "E") {
                dirOfMove = "S"
                row++
            } else if (dirOfMove === "N") {
                dirOfMove = "W"
                col--
            }
        } else if (arr[row][col] === "F") {
            arr[row][col] = "V"
            if (dirOfMove === "W") {
                dirOfMove = "S"
                row++
            } else if (dirOfMove === "N") {
                dirOfMove = "E"
                col++
            }
        }
    }
    
    return arr.map((row) => {
        return row.map((item)  => {
            if (!(item === "V" || item === "H" || item === "S")) {
                return "."
            } else if (item === "S") {
                //Make sure "S" gets transformed to a Vertical or Horizontal boundary
                if ((firstDir === "E" || firstDir === "W") && dirOfMove === "N" ) {
                    return "V"
                } else if ((firstDir === "N" || firstDir === "S") && (dirOfMove === "S" || dirOfMove === "S")) {
                    return "V"
                } else {
                    return "H"
                }
            } else {
                return item
            }
        })
    })
}

findNumInside = (arr) => {
    let newArr = findPath(arr); 
    let insideCount = 0 
    for (let i = 0; i < newArr.length; i++) {
        let intersections = 0
        for (let j = 0; j < newArr[i].length; j++) {
            if (newArr[i][j] === "V") {
                intersections++
            }
            //Item is inside loop if there is an odd number of intersections with the vertical boundary preceeding the item. 
            if (intersections%2 !== 0 && newArr[i][j] === ".") {
                insideCount++
            }
    }
}
return insideCount 
}

// console.log(findNumInside(exampleData))
// console.log(findNumInside(exampleData2))
// console.log(findNumInside(exampleData3))
console.log(findNumInside(data))
