const { inputData } = require("./data.js");

const parseData2 = (str) => {
    return str.split("\n").map((x) => {
        return x.replace(/twone/g, '21')
                .replace(/sevenine/g, "79")
                .replace(/oneight/g, "18")
                .replace(/threeight/g, "38")
                .replace(/nineight/g, "98")
                .replace(/fiveight/g, "58")
                .replace(/eighthree/g, "83")
                .replace(/eightwo/g, "82")
                .replace(/one/g, '1')
                .replace(/two/g, "2")
                .replace(/three/g, "3")
                .replace(/four/g, "4")
                .replace(/five/g, "5")
                .replace(/six/g, "6")
                .replace(/seven/g, "7")
                .replace(/eight/g, "8")
                .replace(/nine/g, "9")
                .replace(/[a-z]+/g, "")})
                .map(x => {
                            return x.split("")[0] + x.split("")[x.length - 1]
                }).reduce((acc, digit) => acc + Number(digit), 0)
}

console.log(parseData2(inputData))
