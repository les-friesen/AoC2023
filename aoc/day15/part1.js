const { inputData, example } = require("./data.js");

const data = inputData.replaceAll("\n", "").split(",")

const exampleData = example.split(",")

const firstExample = ["HASH"]

const part1 = (input) => {

    let data = [...input]
    let total = 0

    data.forEach(string => {
        let current = 0;
        string.split("").forEach(char => {
            current += char.charCodeAt(0)
            current *= 17
            current = current%256
        })
        total += current
    })
return total 
}

console.log(part1(data))