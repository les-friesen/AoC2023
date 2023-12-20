const { inputData, example } = require("./data.js");

// Not my original solution -->>  https://github.com/surgi1/adventofcode/blob/main/2023/day19/script.js
// Copied here to learn from. 

let [flowsLit, ] = inputData.split("\n\n"),
    flows = {};

flowsLit.split("\n").forEach(line => {
    let [id, opsLit] = line.match(/[^({|})]+/g);
    let ops = opsLit.split(',');
    flows[id] = ops.map(opLit => {
        let tmp = opLit.split(/:/g);
        if (tmp.length == 1) return tmp;
        let [k, v] = tmp[0].split(/<|>/g);
        return [k, tmp[0][1], Number(v), tmp[1]];
    });
})

let sum = 0, ents = Object.entries(flows);

const backtrack = (resultId, b = {x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000]}) => ents.forEach(([id, flow]) => {
    for (let condId = 0; condId < flow.length; condId++) {
        if (flow[condId][flow[condId].length-1] == resultId) {
            let i = condId,
                bounds = {x: b.x.slice(), m: b.m.slice(), a: b.a.slice(), s: b.s.slice()}

            while (i >= 0) {
                if (flow[i].length == 1) {i--; continue;}
                let [par, op, val] = flow[i];
                if (i == condId) {
                    //flow[j] was satisfied
                    if (op == '>') {
                        // x > 5 was satisfied
                        if (bounds[par][0] <= val) bounds[par][0] = val+1;
                    } else {
                        // x < 5 was satisfied
                        if (bounds[par][1] >= val) bounds[par][1] = val-1;
                    }
                } else {
                    //flow[j] was not satisfied
                    if (op == '>') {
                        // x > 5 was not satisfied
                        if (bounds[par][1] > val) bounds[par][1] = val;
                    } else {
                        // x < 5 was not satisfied
                        if (bounds[par][0] < val) bounds[par][0] = val;
                    }
                }
                i--;
            }

            if (id == 'in') {
                if (bounds.x[1] >= bounds.x[0] && bounds.m[1] >= bounds.m[0] && bounds.a[1] >= bounds.a[0] && bounds.s[1] >= bounds.s[0]) {
                    sum += (bounds.x[1] - bounds.x[0]+1) * (bounds.m[1] - bounds.m[0]+1) * (bounds.a[1] - bounds.a[0]+1) * (bounds.s[1] - bounds.s[0]+1);
                }
            } else backtrack(id, bounds);
        }
    }
})

backtrack('A');

console.log('p2', sum);


