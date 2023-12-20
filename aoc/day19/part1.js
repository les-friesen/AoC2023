const { inputData, example } = require("./data.js");

// Original solution

const parseData = (data) => {
    let [workflows, parts] = data.split("\n\n")
    parts = parts.replace(/[xmas=]/g, "").replaceAll("{", "[").replaceAll("}", "]").split("\n").map(x => JSON.parse(x))
    workflows = Object.fromEntries(workflows.replace(/[}]/g, "").split("\n").map(x => x.split("{").map(y => y.split(","))))
    return [workflows, parts]
}

const part1 = (data) => {
    let accepted = []
    const [workflows, parts] = parseData(data);
    parts.forEach(part => {
        let current = "in"
        while (current !== "A" && current !== "R") {
            for (let i = 0; i < workflows[current].length; i++) {
            if (workflows[current][i] === "A") {
                current = "A"
                break;
            } else if (workflows[current][i] === "R") {
                current = "R"
                break;
            } else if (Object.keys(workflows).includes(workflows[current][i])) {
                current = workflows[current][i]
                break;
            } else {
                const [, arg, num, dest] = workflows[current][i].match(/([xmas><]+)([\d]+):([a-zA-Z]+)/)
                    if (arg === "x<") {
                        if (part[0] < +num) {
                            current = dest
                            break;
                        } else {
                            continue
                        }
                    } else if (arg === "x>") {
                        if (part[0] > +num) {
                            current = dest
                            break;
                        } else {
                            continue
                        }
                    } else if (arg === "m<") {
                        if (part[1] < +num) {
                            current = dest
                            break;
                        } else {
                            continue
                        }
                    } else if (arg === "m>") {
                        if (part[1] > +num) {
                            current = dest
                            break;
                        } else {
                            continue
                        }
                    } else if (arg === "a<") {
                        if (part[2] < +num) {
                            current = dest
                            break;
                        } else {
                            continue
                        }
                    } else if (arg === "a>") {
                        if (part[2] > +num) {
                            current = dest
                            break;
                        } else {
                            continue
                        }
                    } else if (arg === "s<") {
                        if (part[3] < +num) {
                            current = dest
                            break;
                        } else {
                            continue
                        }
                    } else if (arg === "s>") {
                        if (part[3] > +num) {
                            current = dest
                            break;
                        } else {
                            continue
                        }
                    }
                }
            }
        }
        if (current === "A") {
            accepted.push(part.reduce((a,b) => a+b,0))
        }
    })
return accepted.reduce((a,b) => a+b,0)
}

console.log(part1(inputData))