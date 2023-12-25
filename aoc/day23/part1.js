const { inputData, example } = require("./data.js");

const part1 = (data) => {
    const grid = data.split("\n")
    const [sr, sc] = [0, 1]
    const [tr, tc] = [grid.length-1, grid[0].length-2]
    const dirs = [[0,1],[1,0],[-1,0],[0,-1]]
    let q = [[sr, sc, 0, 1, 0]]
    let lengths = []
    while (q.length) {
        let [r, c, num, dr, dc] = q.shift()
        if (r === tr && c == tc) {
            lengths.push(num)
        } else {
            for (let [ndr, ndc] of dirs) {
                if (ndr+r > 0 && ndr+r < grid.length && !(ndr === -dr && ndc === -dc)) {
                    if (grid[r+ndr][c+ndc] === "." ||
                        (ndr === -1 && grid[r+ndr][c+ndc] === "^") ||
                        (ndr === 1 && grid[r+ndr][c+ndc] === "v") ||
                        (ndc === -1 && grid[r+ndr][c+ndc] === "<") ||
                        (ndc === 1 && grid[r+ndr][c+ndc] === ">")
                    ) {
                        q.push([r+ndr, c+ndc, num + 1, ndr, ndc])
                    }
                }
            }
        }
    }
return Math.max(...lengths)
}

console.log(part1(inputData))