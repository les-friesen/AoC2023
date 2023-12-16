const { inputData, example } = require("./data.js");

const exampleData = example.split("\n")

const data = inputData.split("\n")

const cache = new Map();

const nextPosition = (row, col, dir, grid) => {
    
    if (row < 0 || col < 0 || row === grid.length || col === grid[0].length) {
        return 
    }

    const key = `${row}-${col}-${dir}`;
    if (cache.has(key)) {
        return 
    }

    cache.set(`${row}-${col}-${dir}`, `${row}-${col}`)

    if (dir === "R") { 
        if (col === grid[0].length - 1) {
            //sending you off the board
            return
        } else if (grid[row][col+1] === "-" || grid[row][col+1] === ".") {
            nextPosition(row, col+1, "R", grid)
        } else if (grid[row][col+1] === "|") {
            nextPosition(row, col + 1, "U", grid)
            nextPosition(row, col + 1, "D", grid)
        } else if (grid[row][col+1] === "/") {
            nextPosition(row, col + 1, "U", grid)
        } else if (grid[row][col+1] === "\\") {
            nextPosition(row, col + 1, "D", grid)
        }
    }
    if (dir === "L") {
        if (col === 0) {
            return
        } else if (grid[row][col-1] === "-" || grid[row][col-1] === ".") {
            nextPosition(row, col-1, "L", grid)
        } else if (grid[row][col-1] === "|") {
            nextPosition(row, col-1, "U", grid)
            nextPosition(row, col-1, "D", grid)
        } else if (grid[row][col-1] === "/") {
            nextPosition(row, col-1, "D", grid)
        } else if (grid[row][col-1] === "\\") {
            nextPosition(row, col-1, "U", grid)
        }
    }
    if (dir === "U") {
        if (row === 0) {
            return
        } else if (grid[row-1][col] === "-")  {
            nextPosition(row-1, col, "L", grid)
            nextPosition(row-1, col, "R", grid)
        } else if (grid[row-1][col] === "|" || grid[row-1][col] === ".") {
            nextPosition(row-1, col, "U", grid)
        } else if (grid[row-1][col] === "/") {
            nextPosition(row-1, col, "R", grid)
        } else if (grid[row-1][col] === "\\") {
            nextPosition(row-1, col, "L", grid)
        }
    } 
    if (dir === "D") {
        if (row === grid.length - 1) {
            return
        } else if (grid[row+1][col] === "-")  {
            nextPosition(row+1, col, "L", grid)
            nextPosition(row+1, col, "R", grid)
        } else if (grid[row+1][col] === "|" || grid[row+1][col] === ".") {
            nextPosition(row+1, col, "D", grid)
        } else if (grid[row+1][col] === "/") {
            nextPosition(row+1, col, "L", grid)
        } else if (grid[row+1][col] === "\\") {
            nextPosition(row+1, col, "R", grid)
        }
    }
}

const countEnergized = (grid) => {
    //Start position is actually "D" because of the initial \\ symbol. This will be accounted for in part 2. 
    nextPosition(0, 0, "D", grid); 
    let energized = new Set(cache.values())
    return energized.size
}

console.log(countEnergized(data))
