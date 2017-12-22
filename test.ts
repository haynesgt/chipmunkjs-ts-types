// tsc cp.d.ts test.ts

let space = new cp.Space();
space.step(0.1);

// test inherited properties
let node = new cp.Node();
node.intersectsBB(null);
let leaf = new cp.Leaf();
node.intersectsBB(null);

// test hybrid factory methods
let vect: cp.Vect = cp.v(3,3);
vect.add(cp.v(3,3));
