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
    // initialize empty 10 by 10 grid in x-y plane to keep track of heights and block id's as blocks drop
    let grid = new Array(10).fill().map(() => new Array(10).fill().map(() => [0, "ground"]))
    // sort blocks by lowest z-index at snapshot
    let q = blocks.sort((a, b) => a.first[2] - b.first[2])

    while (q.length) {
        let {first, last, id} = q.shift()
        const [x1, y1, z1] = first
        const [x2, y2, z2] = last
        const dz = z2 - z1
        //horizontal bricks in y axis
        if (x1 === x2 && y1 !== y2) {
            let highest = grid[x1][y1][0]
            // find highest z-index for any block that intersects on the x-y plane
            for (let i = y1; i <= y2; i++) {
                if (grid[x1][i][0] > highest) {
                    highest = grid[x1][i][0]
                }
            }
            for (let i = y1; i<= y2; i++) {
                // add touching blocks to "supportedBy" array, and to the other's "supports" array
                if (grid[x1][i][0] === highest && !blocksObj[id].supportedBy.includes(grid[x1][i][1])) {
                    blocksObj[id].supportedBy.push(grid[x1][i][1])
                    if (grid[x1][i][1] !== "ground") {
                    blocksObj[`${grid[x1][i][1]}`].supports.push(id)
                    }
                }
                // update the grid to reflect the current state
                grid[x1][i][0] = highest + 1
                grid[x1][i][1] = id
            }
        }
        //horizontal bricks in x axis
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
   

    // Part 2 was much easier and quicker, as I just had to go through each block, 
    // and then for all the block dependent on it, I check to see if they could be removed, 
    // with a very similar logic to part 1, slightly adjusted.

    // function is currently adding things multiple times. make a unique set? 
    const getChildren = (id) => {
        const originalId = id
        let children = []
        const addChildren = (newId) => {
                // console.log(blocksObj[id].supports)
                
                    blocksObj[newId].supports.filter(support => blocksObj[support].supportedBy.every(supportedBy => children.includes(supportedBy) || supportedBy === originalId)).forEach(support => {
                    children.push(support)
                    addChildren(support)
                    })
                
            }
            
        addChildren(originalId);
        // console.log(children)
        const childrenSet = new Set(children)
    return childrenSet.size
    }

    // let total = 0

    // Object.values(blocksObj).forEach(block => {
    //     let queue = []
    //     blocksObj[block.id].supports.forEach(supported => {
    //         if (blocksObj[supported].supportedBy.length === 1) {
    //             queue.push(supported)
    //         }
    //     })

    //     let falling = new Set(queue)
    //     falling.add(block.id)

    //     while (queue.length) {
    //         const newId = queue.shift()
    //         console.log(newId)
    //         blocksObj[newId].supports.forEach(supported => {
    //             if ( blocksObj[supported].supportedBy.every(support => falling.has(support))) {
    //                 queue.push(supported)
    //                 falling.add(supported)
    //             }
    //         })
    //     }
    //     total += falling.size - 1
    // })

   

    let sum = 0 

    Object.values(blocksObj).forEach(block => {
            sum += getChildren(block.id)

    })

    return sum 
}

console.log(part1(inputData))