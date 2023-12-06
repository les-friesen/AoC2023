const { inputData } = require("./data.js");

const seedsArray = inputData.replace(/\n/g, "").match(/seeds: ([\d\s]+)/)[1].split(" ").map(Number)

const seedsObj = {}

seedsArray.forEach((seed, index) => {
    if (index%2 === 0) {
        seedsObj[seed] = seedsArray[index+1]
        }
    })
    
const maps = inputData.split(/\n+[a-z\-]+ map:\n/)
                        .splice(1)
                        .map(x => x.split(/\n/).map(y => y.split(" ").map(Number)))
    
const newMaps = maps.reverse().map(x => x.sort((a,b) => a[0] - b[0]))
    
const locations = newMaps[0]

const otherMaps = newMaps.splice(1)
    
    const findLowest = () => {
        let lowestStart; 
        for (let locationSet of locations) {
            let currentNumber = locationSet[1]
            for (let i = locationSet[1]; i < locationSet[1] + locationSet[2]; i++) {
                    currentNumber = i; 
                    otherMaps.forEach((otherMap) => {  
                        for (let set of otherMap ) {
                            if (currentNumber >= set[0] && currentNumber < set[0]+set[2]) {
                                currentNumber = set[1] + (currentNumber - set[0]);
                            break;
                            }
                        }     
                    })
                for (seed of Object.keys(seedsObj)) {
                    if (currentNumber >= +seed && (currentNumber < (+seed + seedsObj[seed]))) {
                            lowestStart = i - locationSet[1]
                            break; 
                    } 
                }
                if (lowestStart >= 0) {
                    break;
                }
            }
            if (lowestStart >= 0) {
                break;
            }
        }
    return lowestStart  
    }

    console.log(findLowest())