const { inputData, example1, example2 } = require("./data.js");

// Logic & Hints from Hyper-Neutrino https://www.youtube.com/watch?v=lxm6i21O83k&t=959s
// Translated to Javascript from Python

const part1 = (data) => {

    let modules = {}
    let broadcastTargets = []

    data.split("\n").forEach(line => {
        const [one, two] = line.split(" -> ")
        if (one === "broadcaster") {
            broadcastTargets = two.replaceAll(" ", "").split(",")
        } else {
        let module = {}
        module["name"] = one.slice(1)
        module["type"] = one[0]
        module["outputs"] = two.replaceAll(" ", "").split(",")
        if (one[0] === "%") {
            module["memory"] = "off"
        }
        if (one[0] === "&") {
            module["memory"] = {}
        }
        modules[one.slice(1)] = module
        }
    })

    for (const {name, outputs} of Object.values(modules)) {
        for (let output of outputs) {
            if (modules[output] && modules[output].type === "&") {
                modules[output].memory[name] = "lo"
            }
        }
    }

    let lo = 0
    let hi = 0
    
    for (let i = 1; i <= 1000; i++) {
        
        lo += 1;
        
        let q = broadcastTargets.map(target => ["broadcaster", target, "lo"])

        while (q.length > 0) {
            const [origin, target, pulse] = q.shift();

            if (pulse === "hi") {
                hi += 1
            } else {
                lo += 1
            }

            if (!Object.keys(modules).includes(target)) {
                continue
            }

            if (modules[target].type === "%") {
                if (pulse === "lo") {   
                    let outgoing
                    if (modules[target].memory === "off") {
                        modules[target].memory = "on"
                        outgoing = "hi"
                        
                    } else {
                        modules[target].memory = "off"
                        outgoing = "lo"
                    }
                    modules[target].outputs.forEach(x => q.push([modules[target].name, x, outgoing]))
                }
            } else  {
                modules[target].memory[origin] = pulse
                let outgoing
                if (Object.values(modules[target].memory).every(x => x === "hi")) {
                    outgoing = "lo"
                } else {
                    outgoing = "hi"
                }
                modules[target].outputs.forEach(x => q.push([modules[target].name, x, outgoing]))
            }
        }
    }
    return lo*hi
}

console.log(part1(example1))
console.log(part1(example2))
console.log(part1(inputData))


