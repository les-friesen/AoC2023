// Logic & Hints from Hyper-Neutrino https://www.youtube.com/watch?v=lxm6i21O83k&t=959s
// Translated to Javascript from Python

const { inputData } = require("./data.js");

const part2 = (data) => {

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

    let feed = ""

    for (const {name, outputs} of Object.values(modules)) {
        if (outputs.includes("rx")) {
            feed = name
        }
    }

    let seen = {}

    for (const {name, outputs} of Object.values(modules)) {
        if (outputs.includes(feed)) {
            seen[name] = 0
        }
    }

    let cycleLengths = {}
    let presses = 0
    let found = false
    
    while (!found) {
        
        presses += 1
        let q = broadcastTargets.map(target => ["broadcaster", target, "lo"])
        let pulsesToRx = 0
        while (q.length > 0) {
            const [origin, target, pulse] = q.shift();

            if (!Object.keys(modules).includes(target)) {
                continue
            }
            
            if (modules[target].name === feed && pulse === "hi") {
                seen[origin] += 1
                    if (!Object.keys(cycleLengths).includes(origin)) {
                        cycleLengths[origin] = presses
                    }
            }

            if (Object.values(seen).every(v => v > 0)) {
                found = true; 
                break;

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
        if (pulsesToRx === 1) {
            found = true;
            break;
        }
    }

    //find least common multiple 
    const findLCM = (numbers) => {
        const findGCD = (a, b)  => {
            return b === 0 ? a : findGCD(b, a % b);
        }
        const findLCMOfTwo = (a, b) => {
            return (a * b) / findGCD(a, b);
        }
        let lcm = numbers[0];
            for (let i = 1; i < numbers.length; i++) {
        lcm = findLCMOfTwo(lcm, numbers[i]);
        }
        return lcm;
        }

    return findLCM(Object.values(cycleLengths))
}

console.log(part2(inputData))