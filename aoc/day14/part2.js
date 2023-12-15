const { inputData, example } = require("./data.js");

const exampleData = example.split(/\n/).map(x => x.split(""))

const data = inputData.split(/\n/).map(x => x.split(""))

const moveNorth = (grid) => {
    let newGrid = grid;
    let changes = false
    for (let i = 0; i < newGrid.length - 1; i++) {
        for (let j = 0; j < newGrid[0].length; j++) {
            if (newGrid[i][j] === "." && newGrid[i+1][j] === "O") {
                newGrid[i][j] = "O";
                newGrid[i+1][j] = "."
                changes = true; 
            }
        }
    }
    return changes === false ? newGrid : moveNorth(newGrid)
}

const moveWest = (grid) => {
    let newGrid = grid;
    let changes = false
    for (let i = 0; i < newGrid.length; i++) {
        for (let j = 0; j < newGrid[0].length - 1; j++) {
            if (newGrid[i][j] === "." && newGrid[i][j+1] === "O") {
                newGrid[i][j] = "O";
                newGrid[i][j+1] = "."
                changes = true; 
            }
        }
    }
    return changes === false ? newGrid : moveWest(newGrid)
}

const moveSouth = (grid) => {
    let newGrid = grid;
    let changes = false
    for (let i = 0; i < newGrid.length - 1; i++) {
        for (let j = 0; j < newGrid[0].length; j++) {
            if (newGrid[i][j] === "O" && newGrid[i+1][j] === ".") {
                newGrid[i][j] = ".";
                newGrid[i+1][j] = "O"
                changes = true; 
            }
        }
    }
    return changes === false ? newGrid : moveSouth(newGrid)
}

const moveEast = (grid) => {
    let newGrid = grid;
    let changes = false
    for (let i = 0; i < newGrid.length; i++) {
        for (let j = 0; j < newGrid[0].length - 1; j++) {
            if (newGrid[i][j] === "O" && newGrid[i][j+1] === ".") {
                newGrid[i][j] = ".";
                newGrid[i][j+1] = "O"
                changes = true; 
            }
        }
    }
    return changes === false ? newGrid : moveEast(newGrid)
}

const cycle = (grid) => {
    return moveEast(moveSouth(moveWest(moveNorth(grid))))
}

const repeatCycle = (grid, n) => {
    let newGrid = grid
    for (let i = 1; i <= n; i++) {
        newGrid = cycle(newGrid)
    }
    return newGrid
}

const findPattern = (array, number) => {
    let snapshots = []
    let newGrid = array
    for (let i = 1; i <= number; i++) {
        newGrid = cycle(newGrid)
        let pattern = newGrid.map(x => x.join("")).toString().replaceAll(",","")
        snapshots.push(pattern)
        if (snapshots.filter(x => x === pattern).length > 1) {
            const [cycleStart, nextCycle] = [snapshots.indexOf(pattern)+1, snapshots.lastIndexOf(pattern)+1]
            const period = nextCycle - cycleStart;
            return [cycleStart, period]
        }
    }
    return "no matches found in this range"
}

const countLoad = (grid, n) => {
    const newGrid = repeatCycle(grid, n)
    return newGrid.reduce((acc, row, index, arr) => acc + (row.filter(x => x === "O").length)*(arr.length-index), 0)
}

// const [cycleStart, period] = findPattern(data, 200)
// cycleStart = 108
// period = 42
// There is a bug -> when I run both the findPattern function and countLoad function the final amount changes.

console.log(countLoad(data, (1000000000-108)%42+108))

//i.e the 1 billionth iteration is equal to the 1000th iteration is equal to the 118th, 10 into the sequence starting at 108. 






