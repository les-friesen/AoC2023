const { inputData, example } = require("./data.js");

const data = inputData.replaceAll(/[\)\(#]/g, "").split("\n").map(x => x.split(" ")).map(x => x[2])

const exampleData = example.replaceAll(/[\)\(#]/g, "").split("\n").map(x => x.split(" ")).map(x => x[2])


const calculateArea = (input) => {

    let current = [0, 0];
    let coordinatesArr = [];
    
    coordinatesArr.push(current[0], current[1]);

// //we will need to add half the perimeter + 1 to the area
// //https://en.wikipedia.org/wiki/Pick%27s_theorem
    let perimeter = 0;

    for (let i = 0; i < input.length; i++) {

        //extract instructions
        let instruction = input[i]
        let dir = instruction.substring(5);

        //0 means R, 1 means D, 2 means L, and 3 means U.
        if (dir === "0") {
            dir = "R"
        } else if (dir === "1") {
            dir = "D"
        } else if (dir === "2") {
            dir = "L"
        } else if (dir === "3") {
            dir = "U"
        }

        //hex to int
        let len = parseInt(instruction.substring(0, 5), 16);
        perimeter += len;

        //prepare to move
        if (dir == "U") current[0] -= len;
        if (dir == "D") current[0] += len;
        if (dir == "L") current[1] -= len;
        if (dir == "R") current[1] += len;

        //move
        coordinatesArr.push(current[0], current[1]);
        }

        //https://stackoverflow.com/questions/24793288/calculating-the-area-of-an-irregular-polygon-using-javascript
        
        const getAreaFromCoordinates = (coordinates) => {
        
            let x = coordinates
            let a = 0;
  
            // Must have even number of elements
            if (x.length % 2) return;

            // Process pairs, increment by 2 and stop at length - 2
            for (var i=0, iLen=x.length-2; i<iLen; i+=2) {
                a += x[i]*x[i+3] - x[i+2]*x[i+1];
                }
            return Math.abs(a/2);
        }
            
return getAreaFromCoordinates(coordinatesArr) + perimeter / 2 + 1;


}

console.log(calculateArea(data))