const { inputData, example } = require("./data.js");

//Breadth first search with FIFO queue, go as far out as you can, then tally up squares that were reached on an even number.
//Including the first step which was changed from "S" to 0. 

const part1 = (data, numSteps) => {
    let grid = data.split("\n").map(x => x.split(""))
    let [sr, sc] = [0,0]
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === "S") {
                [sr, sc] = [i, j]
                grid[i][j] = 0
            }
        }
    }

    console.log(grid.length)
    console.log(grid[0].length)
    let q = [[sr, sc, 0]]
    let dirs = [[0,1],[1,0],[0,-1],[-1,0]]
    while (q.length) {
        let [r, c, num] = q.shift()
        if (num === numSteps) {
            continue
        } else if (num < numSteps) {
            for (let [dr, dc] of dirs) {
                if (grid[r+dr][c+dc] === ".") {
                    grid[r+dr][c+dc] = num + 1
                    q.push([r+dr, c+dc, num + 1])
                }
            }
        }
    }
    let total = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if ((numSteps%2 === 0 && grid[i][j]%2 === 0) || (numSteps%2 !== 0 && grid[i][j]%2 !==0 && grid[i][j] > 0)) {
                total++
            }
        }
    }
    return total
}

console.log(part1(example, 6))
console.log(part1(inputData, 65))
