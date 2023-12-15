const { inputData, example } = require("./data.js");

const exampleData = example.split(/\n/).map(x => x.split(""))

// console.log(exampleData)

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

const countLoad = (grid) => {

    const newGrid = moveNorth(grid)
    
    // let total = 0;
    // newGrid.forEach((row, index, arr) => {
    //     total += (row.filter(x => x === "O").length)*(arr.length-index)
    // })

    // return total 

    return newGrid.reduce((acc, row, index, arr) => acc + (row.filter(x => x === "O").length)*(arr.length-index), 0)

}

console.log(countLoad(data))