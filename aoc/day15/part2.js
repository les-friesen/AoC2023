const { inputData, example } = require("./data.js");

const data = inputData.replaceAll("\n", "").split(",")

const exampleData = example.split(",")

// data structure: Array of length 256, index = box number. 
// Each box contains an array of arrays.  
// boxes = [0, 0, [[ rn, 1] , [qp, 9 ]], 0, etc. ]

const findBoxNumber = (string) => {
    let current = 0
    string.split("").forEach(char => {
        current += char.charCodeAt(0)
        current *= 17
        current = current%256
    })
    return current
}

const part2 = (input) => {
    let data = [...input]
    let boxes = new Array(256).fill().map( () => [] )
    data.forEach(string => {
        if (string.includes("-")) {
            const label = string.replace("-", "")
            const boxNumber = findBoxNumber(label)
            if (boxes[boxNumber].filter(pair => pair[0] === label).length === 1) {
                const ind = boxes[boxNumber].findIndex(pair => pair[0] === label)
                boxes[boxNumber].splice(ind, 1)
            }
        }   else {
            const [label, number] = string.split("=")
            const boxNumber = findBoxNumber(label)
            if (boxes[boxNumber].filter(pair => pair[0] === label).length === 1) {
                const ind = boxes[boxNumber].findIndex(pair => pair[0] === label)
                boxes[boxNumber][ind][1] = +number 
            } else {
                boxes[boxNumber] = [...boxes[boxNumber], [label, +number]]
            }
        }
    })
    const newArr = boxes.map((box, index) => {
        if (box.length > 0) {
            return box.reduce((acc, pair, pairIndex) => acc + (index+1)*(pairIndex+1)*pair[1],0) 
        } else {
            return 0
        }
    })
return newArr.reduce((acc, number) => acc+number,0)
}

console.log(part2(data))

