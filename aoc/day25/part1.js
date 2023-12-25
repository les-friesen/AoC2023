const { inputData, example } = require("./data.js");
const ka = require("./karger");

const parseGraph = () => {
    
    const strs = inputData.split("\n")

    let nodes = [];
    let edges = [];
    let indexes = {};
  
    const add = (u) => {
      if (!(u in indexes)) {
        indexes[u] = nodes.length;
        nodes.push(u);
      }
      return indexes[u];
    };
  
    strs.forEach((str) => {
      const [left, right] = str.split(": ");
      const u = add(left);
  
      right.split(" ").forEach((c) => {
        const v = add(c);
        edges.push([u, v]);
      });
    });
    return { nodes, edges };
  };
  
  const graph = parseGraph();
  
  const part1 = ({ nodes, edges }) => {
  
    const V = nodes.length;
    const E = edges.length;
    let g = new ka.Graph(V, E);
    g.edge = edges.map(([u, v]) => new ka.Edge(u, v));
  
    let k = 0;
    let res;
    let components;
    while (k < 200) {
      k++;
      let r = Math.random();
      [res, components] = ka.kargerMinCut(g);
      if (res == 3) break;
    }
  
    let list = {};
    components.forEach((c) => {
      if (!(c in list)) list[c] = 0;
      list[c]++;
    });
  
    return Object.values(list)[0]*Object.values(list)[1]
  };
  
console.log(part1(graph))



