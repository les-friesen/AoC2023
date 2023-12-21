const { inputData } = require("./data.js");

// A few assumptions made for this puzzle. First of all, the start position is the centre of a 131x131 grid,
// There are no rocks in the direct path to the edges, so it takes 65 steps to reach the edge of a grid. 
// The final step amount, 26501365, minus, is divisible by the length (131) = 202300. 
// This means that when we reach that amount of steps, we are at the edge of a grid. 
// The step sizes grow in a quadratic fashion (I figured this out from the example data), so if we know the number of steps it takes to 
// reach the 1st, 2nd, and 3rd edges of the expanded grid, we can extrapolate a formula for finding the 202300th number in the sequence. 
// After 65 steps, i = 0 (length*0 + 65), 131+65 steps, and 131*2+65 steps, i=0: 3944, i=1: 35082, i=2: 97230

const part2 = (data, numSteps) => {
    
    // Expanded to a 5x5 grid to get the first 3 values for reaching the edge of a grid. 
    let newGrid = data.split("\n").map(x => x.repeat(5)).join("\n")+"\n"
    let newGrid2 = newGrid.repeat(5)

    // Replace all "S" charachters with "." There is only one true centre. 
    let grid = newGrid2.split("\n").map(x => x.split(""))
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === "S") {
                grid[i][j] = "."
            }
        }
    }

    // Setting very centre tile (131+131+65) to zero. 
    grid[327][327] = 0

    let q = [[327, 327, 0]]
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

const simplifiedLagrange = (values) => {
    return {
      a: values[0] / 2 - values[1] + values[2] / 2,
      b: -3 * (values[0] / 2) + 2 * values[1] - values[2] / 2,
      c: values[0],
    };
  };

  const solvePart2 = (input) => {
    const values = [part2(input, 65), part2(input, 65 + 131), part2(input, 65 + 131 * 2)];
    const poly = simplifiedLagrange(values);
    const target = (26501365 - 65) / 131;
    return poly.a * target * target + poly.b * target + poly.c;
  };

  console.log(solvePart2(inputData))