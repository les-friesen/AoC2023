const { inputData } = require("./data.js");

const parseData1 = (str) => {
    return str.split("\n")
            .map(x => {
            return x.replace(/\D+/g, '')
            })
            .map(x => {
                return x.split("")[0] + x.split("")[x.length - 1]
            })
            .reduce((acc, digit) => acc + Number(digit), 0)
}

console.log(parseData1(inputData))