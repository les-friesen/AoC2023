
const { inputData, example } = require("./data.js");
const { init } = require('z3-solver/build/node.js');

const getStartingCoordinates = async (data) => {
    const hailStones = data
        .split("\n")
        .slice(1, 4)
        .map((line) => {
            const [x, y, z] = line.split("@")[0].split(",").map(Number);
            const [vx, vy, vz] = line.split("@")[1].split(",").map(Number);
            return { x, y, z, vx, vy, vz, m: vy / vx };
        });
    const { Context } = await init();
    const { Real, Solver } = Context("main");
    const x = Real.const("x");
    const y = Real.const("y");
    const z = Real.const("z");
    const vx = Real.const("vx");
    const vy = Real.const("vy");
    const vz = Real.const("vz");

    const solver = new Solver();
    for (let i = 0; i < hailStones.length; i++) {
        const stone = hailStones[i];
        const t = Real.const(`t${i}`);
        solver.add(t.ge(0));
        solver.add(x.add(vx.mul(t)).eq(t.mul(stone.vx).add(stone.x)));
        solver.add(y.add(vy.mul(t)).eq(t.mul(stone.vy).add(stone.y)));
        solver.add(z.add(vz.mul(t)).eq(t.mul(stone.vz).add(stone.z)));
    }
    const isSat = await solver.check();
    if (isSat !== "sat") return -1;
    const model = solver.model();
    const rx = Number(model.eval(x));
    const ry = Number(model.eval(y));
    const rz = Number(model.eval(z));
    return rx + ry + rz;
};

const part2 = (data) => { 
    getStartingCoordinates(data).then(newData => {
        console.log(newData)    
    }).catch(err => {
        console.log(err);
    })
    return "part 2 ans"
}

console.log(part2(inputData))