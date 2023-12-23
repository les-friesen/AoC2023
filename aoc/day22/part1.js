const { inputData, example } = require("./data.js");

const part1 = (data) => {

    let blocks = []
    let blocksObj = {}

    data.split("\n").forEach(line => {
        let block = {}
        block["id"] = line
        let [first, last] = line.split("~")
        first = first.split(",").map(Number)
        last = last.split(",").map(Number)
        block["first"] = first
        block["last"] = last
        block["supports"] = []
        block["supportedBy"] = []
        blocksObj[line] = block
        blocks.push(block)
    })

    let grid = new Array(10).fill().map(() => new Array(10).fill().map(() => [0, "ground"]))

    let q = blocks.sort((a, b) => a.first[2] - b.first[2])

    while (q.length) {

        let {first, last, id, supports, supportedBy} = q.shift()
        const [x1, y1, z1] = first
        const [x2, y2, z2] = last
        const dz = z2 - z1

        if (x1 === x2 && y1 !== y2) {
            let highest = grid[x1][y1][0]
            for (let i = y1; i <= y2; i++) {
                if (grid[x1][i][0] > highest) {
                    highest = grid[x1][i][0]
                }
            }
            for (let i = y1; i<= y2; i++) {
                if (grid[x1][i][0] === highest && !blocksObj[id].supportedBy.includes(grid[x1][i][1])) {
                    blocksObj[id].supportedBy.push(grid[x1][i][1])
                    if (grid[x1][i][1] !== "ground") {
                    blocksObj[`${grid[x1][i][1]}`].supports.push(id)
                    }
                }
                grid[x1][i][0] = highest + 1
                grid[x1][i][1] = id
            }
        }

        if (y1 === y2 && x1 !== x2) {
            let highest = grid[x1][y1][0]
            for (let i = x1; i <= x2; i++) {
                if (grid[i][y1][0] > highest) {
                    highest = grid[i][y1][0]
                }
            }
            for (let i = x1; i<= x2; i++) {
                if (grid[i][y1][0] === highest && !blocksObj[id].supportedBy.includes(grid[i][y1][1])) {
                    blocksObj[id].supportedBy.push(grid[i][y1][1])
                    if (grid[i][y1][1] !== "ground") {
                    blocksObj[`${grid[i][y1][1]}`].supports.push(id)
                    }
                }
                grid[i][y1][0] = highest + 1
                grid[i][y1][1] = id
            }
        }
        // vertical bricks
        if (y1 === y2 && x1 === x2) {
            blocksObj[id].supportedBy.push(grid[x1][y1][1])
            if (grid[x1][y1][1] !== "ground") {
            blocksObj[`${grid[x1][y1][1]}`].supports.push(id)
            }
            grid[x1][y1][0] = grid[x1][y1][0] + dz + 1
            grid[x1][y1][1] = id
        }
    }
    let count = 0 
    // For part 1, count a brick if it isn't alone in supporting some other brick
    Object.values(blocksObj).forEach(block => {
        if (block.supports.every(support => {
            return (blocksObj[support].supportedBy.length > 1)}) || block.supports.length === 0) {
            count++
        }
    })
    return count
}

console.log(part1(inputData))
