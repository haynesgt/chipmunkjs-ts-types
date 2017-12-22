// tsc cp.d.ts test.ts
var space = new cp.Space();
space.step(0.1);
// test inherited properties
var node = new cp.Node();
node.intersectsBB(null);
var leaf = new cp.Leaf();
node.intersectsBB(null);
// test hybrid factory methods
var vect = cp.v(3, 3);
vect.add(cp.v(3, 3));
