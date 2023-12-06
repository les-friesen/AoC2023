const { inputData } = require("./data.js");

const findLowest = (inputData) => {

    const seeds = inputData.replace(/\n/g, "").match(/seeds: ([\d\s]+)/)[1].split(" ").map(x => +x)

    const maps = inputData.split(/\n+[a-z\-]+ map:\n/)
                        .splice(1)
                        .map(x => x.split(/\n/).map(y => y.split(" ").map(z => +z)))
    
    let finalNumbers = []                
                        
    seeds.forEach((seed) => {
        let currentNumber = seed
        maps.forEach((mapx) => {  
            for (set of mapx ) {
                if (currentNumber >= set[1] && currentNumber < set[1]+set[2]) {
                    currentNumber = set[0] + (currentNumber - set[1]);
                    console.log(`Seed ${seed} is now ${currentNumber}`) 
                    break;
                }
            }
        })
        finalNumbers.push(currentNumber)
    })
 return Math.min(...finalNumbers)
}

console.log(findLowest(inputData))
