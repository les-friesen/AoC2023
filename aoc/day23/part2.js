const { inputData, example } = require("./data.js");

const part2 = (data) => {
    const grid = data.split("\n")
    const [sr, sc] = [0, 1]
    const [tr, tc] = [grid.length-1, grid[0].length-2]
    const dirs = [[0,1],[1,0],[-1,0],[0,-1]]
    let q = [[sr, sc, 0, 1, 0]]
    let points = [[sr, sc], [tr,tc]]
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === "#") 
                continue; 
            let neighbours = 0
            for (let [dr, dc] of dirs) {
                let nr = r + dr
                let nc = c + dc
                if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] !== "#") {
                    neighbours +=1
                }     
            }
            if (neighbours >= 3) {
                points.push([r,c])
            }
        }
    }

    let graph = {}
    points.forEach(point => graph[point] = {})
    let pointsSet = new Set(points)
    points.forEach(([r,c]) => {
        pointsSet.add(`${r}-${c}`)
    })

   points.forEach( ([sr, sc]) => {
    let stack = [[sr,sc,0]]
    let seen = new Set()
    while (stack.length) {
        const [r, c, n] = stack.pop()
        if (n !== 0 && pointsSet.has(`${r}-${c}`)) {
            graph[[sr,sc]][[r,c]] = n
            continue
        }
        for (let [dr, dc] of dirs) {
            let nr = r+dr
            let nc = c+dc
            if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] !== "#" && !seen.has(`${nr}-${nc}`)) {
                stack.push([nr, nc, n+1])
                seen.add(`${nr}-${nc}`)
            }
        }
    }
   })

   let seen = new Set()
   const dfs = (point) => {
    const end = `${tr},${tc}`
    if (point === end) {
        return 0
    }
    let m = Number.NEGATIVE_INFINITY
    seen.add(point)
    Object.keys(graph[point]).forEach( newPoint => {
        if (!seen.has(newPoint)) {
        m = Math.max(m, dfs(newPoint) + graph[point][newPoint])
        }
    })
    seen.delete(point)
    return m
   }
return dfs(`0,1`)
}

console.log(part2(inputData))