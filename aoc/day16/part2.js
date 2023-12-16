const { inputData, example } = require("./data.js");

const exampleData = example.split("\n")

const data = inputData.split("\n")

const findPaths = (row, col, startDir, grid) => {
    
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

    if (startDir === "R") {
        if (grid[row][col] === "|") {
            nextPosition(row, col, "U", grid)
            nextPosition(row, col, "D", grid)
        } 
        if (grid[row][col] === "/") {
            nextPosition(row, col, "U", grid)
        }
        if (grid[row][col] === "\\") {
            nextPosition(row, col, "D", grid)
        }
        if (grid[row][col] === "-" || grid[row][col] === ".") {
            nextPosition(row, col, "R", grid)
        }
    }  

    if (startDir === "L") {
        if (grid[row][col] === "|") {
            nextPosition(row, col, "U", grid)
            nextPosition(row, col, "D", grid)
        } 
        if (grid[row][col] === "/") {
            nextPosition(row, col, "D", grid)
        }
        if (grid[row][col] === "\\") {
            nextPosition(row, col, "U", grid)
        }
        if (grid[row][col] === "-" || grid[row][col] === ".") {
            nextPosition(row, col, "L", grid)
        }
    } 

    if (startDir === "U") {
        if (grid[row][col] === "|" || grid[row][col] === ".") {
            nextPosition(row, col, "U", grid)
        } 
        if (grid[row][col] === "/") {
            nextPosition(row, col, "R", grid)
        }
        if (grid[row][col] === "\\") {
            nextPosition(row, col, "L", grid)
        }
        if (grid[row][col] === "-")  {
            nextPosition(row, col, "R", grid)
            nextPosition(row, col, "L", grid)
        }
    } 

    if (startDir === "D") {
        if (grid[row][col] === "|" || grid[row][col] === ".") {
            nextPosition(row, col, "D", grid)
        } 
        if (grid[row][col] === "/") {
            nextPosition(row, col, "L", grid)
        }
        if (grid[row][col] === "\\") {
            nextPosition(row, col, "R", grid)
        }
        if (grid[row][col] === "-")  {
            nextPosition(row, col, "R", grid)
            nextPosition(row, col, "L", grid)
        }
    }  
    let energized = new Set(cache.values())
    return energized.size
}

const findBestPath = (grid) => {
    let paths = []
    grid.forEach((row, index) => {
        paths.push(findPaths(index, 0, "R", grid))
        paths.push(findPaths(index, row.length-1, "L", grid))
    })
    for (let i = 0; i < grid[0].length; i++) {
        paths.push(findPaths(0, i, "D", grid))
        paths.push(findPaths(grid.length-1, i, "U", grid))
    }
    return Math.max(...paths)
}

console.log(findBestPath(data))


