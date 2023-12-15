const { inputData, example } = require("./data.js");

const data = inputData.split("\n")
                        .map(x => x.split(" ")
                        .map((y, index) => { 
                                if (index === 0) {
                                    return y 
                                } else {
                                    return y.split(",").map(Number)
                                } 
                            }
                        ))

const exampleData = example.split("\n")
                            .map(x => x.split(" ")
                            .map((y, index) => { 
                                    if (index === 0) {
                                        return y 
                                    } else {
                                        return y.split(",").map(Number)
                                    } 
                                }
                            ))

const countWays = (config, numbers) => {

    if (config === '') {
        if (numbers.length === 0) {
            return 1;
        }
        return 0;
    }

    if (numbers.length === 0) {
        if (config.includes('#')) {
            return 0;
        }
        return 1;
    }

    let result = 0;

    if (config[0] === '.' || config[0] === '?') {
        result += countWays(config.substring(1), numbers);
    }

    if (config[0] === '#' || config[0] === '?') {
        if (
            numbers[0] <= config.length &&
            !config.substring(0, numbers[0]).includes('.') &&
            (numbers[0] === config.length || config[numbers[0]] !== '#')
        ) {
            if (numbers[0] === config.length) {
                result += countWays('', numbers.slice(1));
            } else {
                result += countWays(config.substring(numbers[0] + 1), numbers.slice(1));
            }
        }
    }
    return result
}

const findTotal = (input) => {
    let total = 0
    input.forEach(pair => {
        total += countWays(pair[0], pair[1])
    })
return total 
}

console.log(findTotal(data))