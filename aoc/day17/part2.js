const { Heap } = require('heap-js')

const { inputData, example } = require("./data.js");

const exampleData = example.split("\n").map(x => x.split("").map(Number))

const data = inputData.split("\n").map(x => x.split("").map(Number))

const findPath = (grid) => {

    const seen = new Map()

    const minHeap = new Heap((a, b) => a.heatLoss - b.heatLoss)

    let initial = [{row: 0, col: 0, rowDir: 1, colDir: 0, consecutive: 0, heatLoss: 0}, {row: 0, col: 0, rowDir: 0, colDir: 1, consecutive: 0, heatLoss: 0}]

    minHeap.init(initial)

    while (minHeap.length) {
        const {row, col, rowDir, colDir, consecutive, heatLoss} = minHeap.pop()

        if (row === grid.length - 1 && col === grid[0].length -1 && consecutive >= 4) {
            return heatLoss
        }

        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
            continue
        }

        const key = `${row}-${col}-${rowDir}-${colDir}-${consecutive}`;
        if (seen.has(key)) {
            continue
        }
        
        seen.set(key, heatLoss);

        if (consecutive < 10 && !(rowDir === 0 && colDir === 0)) {
            let newRow = row + rowDir
            let newCol = col + colDir
            if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
                minHeap.push({row: newRow, col: newCol, rowDir: rowDir, colDir: colDir, consecutive: consecutive + 1, heatLoss: heatLoss + grid[newRow][newCol]})
            }
        }

        const directions = [[0,1],[1,0],[0,-1],[-1,0]]

        if (consecutive >= 4 && !(rowDir === 0 && colDir === 0)) {
            directions.forEach(pair => {
                const [newRowDir, newColDir] = pair
                if (!(newRowDir === rowDir && newColDir === colDir) && !(newRowDir === -rowDir && newColDir === -colDir) ) {
                    let newRow = row + newRowDir
                    let newCol = col + newColDir
                    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
                        minHeap.push({row: newRow, col: newCol, rowDir: newRowDir, colDir: newColDir, consecutive: 1, heatLoss: heatLoss + grid[newRow][newCol]})
                    }
                }
            })
        }
    }
}

console.log(findPath(data))