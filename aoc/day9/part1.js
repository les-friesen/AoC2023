const { inputData } = require("./data.js");

const data = inputData.split("\n").map(line => line.split(" ").map(Number))

const findHistory = (arr) => {
    let allArrays = [arr]
    const findNextArr = (arr) => {
        let nextArr = []
        for (let i = 1; i < arr.length; i++) {
            nextArr.push(arr[i]-arr[i-1])
        }
        allArrays.push(nextArr)
        return nextArr.join("") == 0 ? allArrays : findNextArr(nextArr)
    }
    findNextArr(arr); 
    return allArrays.reduce((acc, arr) => acc+arr[arr.length-1], 0)
}

const findTotal = (arrOfarrs) => {
    let total = 0
    arrOfarrs.forEach(array => 
        total += findHistory(array))
    return total
}

console.log(findTotal(data))
