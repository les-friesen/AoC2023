const { inputData, example } = require("./data.js");

const data = inputData.replaceAll(/[\)\(#]/g, "").split("\n").map(x => x.split(" ")).map(x => [x[0], +x[1], x[2]])

const exampleData = example.replaceAll(/[\)\(#]/g, "").split("\n").map(x => x.split(" ")).map(x => [x[0], +x[1], x[2]])

const findGridDimensions = (map) => {
    let currentRow = 0
    let currentCol = 0
    let rows = []
    let cols = []
    map.forEach(group => {
        const [dir, num, color] = group
        if (dir === "R") {
            currentCol += num
            cols.push(currentCol)
        }
        if (dir === "L") {
            currentCol -= num
            cols.push(currentCol)
        }
        if (dir === "U") {
            currentRow -= num
            rows.push(currentRow)
        }
        if (dir === "D") {
            currentRow += num
            rows.push(currentRow)
        }
    })
    const dimensions = [Math.min(...rows), Math.max(...rows), Math.min(...cols), Math.max(...cols)]
return dimensions
}

const fillGrid = (map) => {
    const [minRow, maxRow, minCol, maxCol] = findGridDimensions(map)
    const gridHeight = Math.abs(minRow) + maxRow
    const gridWidth = Math.abs(minCol) + maxCol
    const [startRow, startCol] = [Math.abs(minRow), Math.abs(minCol)]
    const grid = new Array(gridHeight+1).fill().map(() => []).map(x => new Array(gridWidth+1).fill("."))

    let row = startRow
    let col = startCol
    
    //convert borders to H and V, making all upper corners V and all lower corners H. 
    map.forEach((group, index, arr) => {
        let [dir, num, color] = group
        while (num > 0) {
            if (dir === "R") {
                if (num === 1) {
                    if (arr[index+1][0] === "D") {
                        grid[row][col+1] = "V"
                    } else {
                        grid[row][col+1] = "H"
                    }
                } else {
                grid[row][col+1] = "H"
                }
                col++
                num--
            }
            if (dir === "L") {
                if (num === 1) {
                    if (arr[index+1][0] === "D") {
                        grid[row][col-1] = "V"
                    } else {
                        grid[row][col-1] = "H"
                    }
                } else {
                grid[row][col-1] = "H"
                }
                col--
                num--
            }
            if (dir === "U") {
                grid[row-1][col] = "V"
                row--
                num--
            }
            if (dir === "D") {
                if (num === 1) {
                        grid[row+1][col] = "H"
                } else {
                grid[row+1][col] = "V"
                }
                row++
                num--
            }
        }
    })

    let insideCount = 0 
        for (let i = 0; i < grid.length; i++) {
            let intersections = 0
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] === "V") {
                    intersections++
                }
                if (intersections%2 !== 0 && grid[i][j] === ".") {
                    insideCount++
                }
        }
    }
    // sum of perimiter plus inside 
    return map.reduce((acc, group) => acc+group[1],0) + insideCount
}

console.log(fillGrid(data))
