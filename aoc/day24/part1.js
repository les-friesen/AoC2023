const { inputData, example } = require("./data.js");

const part1 = (data) => {
    const arr = data.replaceAll(" ", "").replaceAll("@", ",").split("\n")
    let hailstones = {}
    arr.forEach(dataset => {
        const [sx, sy, sz, vx, vy, vz] = dataset.split(",").map(Number)
        let obj = {}
        obj["id"] = dataset;
        obj["sx"] = sx;
        obj["sy"] = sy;
        obj["sz"] = sz;
        obj["vx"] = vx;
        obj["vy"] = vy;
        obj["vz"] = vz;
        obj["a"] = vy;
        obj["b"] = -vx;
        obj["c"] = vy*sx-vx*sy
        hailstones[dataset] = obj
    })
    let hailstonesArr = Object.values(hailstones)
    let total = 0
    hailstonesArr.forEach((hs1, i) => {
        if (i < hailstonesArr.length - 1) {
        hailstonesArr.slice(i+1).forEach(hs2 => {
            let [a1, b1, c1] = [hailstones[hs1.id].a, hailstones[hs1.id].b, hailstones[hs1.id].c]
            let [a2, b2, c2] = [hailstones[hs2.id].a, hailstones[hs2.id].b, hailstones[hs2.id].c]
            if (a1*b2 !== a2*b1) {
                let x = (c1*b2-c2*b1)/(a1*b2-a2*b1)
                let y = (c2*a1-c1*a2)/(a1*b2-a2*b1)
                if (x >= 200000000000000 && x <= 400000000000000 && y >= 200000000000000 && y <= 400000000000000) {
                    if ((x - hs1.sx)*hs1.vx >= 0 &&  (y-hs1.sy)*hs1.vy >= 0 && (x - hs2.sx)*hs2.vx >= 0 &&  (y-hs2.sy)*hs2.vy >= 0){
                        total++
                    }
                }
            }
        })
        }
    }) 
    return total
}

console.log(part1(inputData))