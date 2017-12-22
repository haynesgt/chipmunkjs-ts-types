declare let ALL_LAYERS: any
declare class BB {
  public b: any;
  public l: any;
  public r: any;
  public t: any;
}
declare class BBTree {
  public A: any;
  public B: any;
  public bb_b: any;
  public bb_l: any;
  public bb_r: any;
  public bb_t: any;
  public count: any;
  public isLeaf: any;
  public leafA: any;
  public leafB: any;
  public leaves: any;
  public nextA: any;
  public nextB: any;
  public obj: any;
  public pairs: any;
  public parent: any;
  public pooledNodes: any;
  public pooledPairs: any;
  public prevA: any;
  public prevB: any;
  public root: any;
  public stamp: any;
  public velocityFunc: any;
  public markLeafQuery(leaf, left, tree, func): any;
  public makeNode(a, b): any;
  public getStamp(): any;
  public incrementStamp(): any;
  public makePair(leafA, nextA, leafB, nextB): any;
  public recycle(tree): any;
  public clearPairs(tree): any;
  public recycle(tree): any;
  public recycle(tree): any;
  public setA(value): any;
  public setB(value): any;
  public otherChild(child): any;
  public replaceChild(child, value, tree): any;
  public bbArea(): any;
  public bbArea(): any;
  public intersectsBB(bb): any;
  public intersectsBB(bb): any;
  public subtreeRecycle(node): any;
  public markLeafQuery(leaf, left, tree, func): any;
  public getBB(obj, dest): any;
  public markSubtree(tree, staticRoot, func): any;
  public markSubtree(tree, staticRoot, func): any;
  public containsObj(obj): any;
  public update(tree): any;
  public addPairs(tree): any;
  public insert(obj, hashid): any;
  public remove(obj, hashid): any;
  public contains(obj, hashid): any;
  public reindexQuery(func): any;
  public reindex(): any;
  public reindexObject(obj, hashid): any;
  public pointQuery(point, func): any;
  public segmentQuery(a, b, t_exit, func): any;
  public query(bb, func): any;
  public each(func): any;
  public optimize(): any;
  public log(): any;
}
declare class Body {
  public arbiterList: any;
  public constraintList: any;
  public f: any;
  public i: any;
  public i_inv: any;
  public m: any;
  public m_inv: any;
  public nodeIdleTime: any;
  public nodeNext: any;
  public nodeRoot: any;
  public p: any;
  public rot: any;
  public shapeList: any;
  public space: any;
  public t: any;
  public v_biasx: any;
  public v_biasy: any;
  public v_limit: any;
  public vx: any;
  public vy: any;
  public w: any;
  public w_bias: any;
  public w_limit: any;
  public isRogue(): any;
  public sanityCheck(): any;
  public getPos(): any;
  public getVel(): any;
  public getAngVel(): any;
  public isSleeping(): any;
  public isStatic(): any;
  public sanityCheck(): any;
  public setMass(mass): any;
  public setMoment(moment): any;
  public addShape(shape): any;
  public removeShape(shape): any;
  public removeConstraint(constraint): any;
  public setPos(pos): any;
}
declare let BoxShape: any
declare class BoxShape2 {
  public bb_b: any;
  public bb_l: any;
  public bb_r: any;
  public bb_t: any;
  public transformVerts(p, rot): any;
  public transformAxes(p, rot): any;
  public cacheData(p, rot): any;
  public nearestPointQuery(p): any;
  public segmentQuery(a, b): any;
  public valueOnAxis(n, d): any;
  public containsVert(vx, vy): any;
  public containsVertPartial(vx, vy, n): any;
  public getNumVerts(): any;
  public getVert(i): any;
}
declare class CircleShape {
  public bb_b: any;
  public bb_l: any;
  public bb_r: any;
  public bb_t: any;
  public c: any;
  public r: any;
  public tc: any;
  public type: any;
  public cacheData(p, rot): any;
  public nearestPointQuery(p): any;
  public segmentQuery(a, b): any;
}
declare class CollisionHandler {
  public a: any;
  public b: any;
  public bias: any;
  public body_a: any;
  public body_b: any;
  public bounce: any;
  public collisionCode: any;
  public collisionTable: any;
  public contacts: any;
  public dist: any;
  public e: any;
  public handler: any;
  public hash: any;
  public jBias: any;
  public jnAcc: any;
  public jtAcc: any;
  public n: any;
  public nMass: any;
  public normal: any;
  public p: any;
  public point: any;
  public r1: any;
  public r2: any;
  public stamp: any;
  public state: any;
  public surface_vr: any;
  public swappedColl: any;
  public tMass: any;
  public thread_a_next: any;
  public thread_a_prev: any;
  public thread_b_next: any;
  public thread_b_prev: any;
  public u: any;
  public isFirstContact(): any;
  public begin(arb, space): any;
  public postSolve(arb, space): any;
  public separate(arb, space): any;
  public getShapes(): any;
  public totalImpulse(): any;
  public totalImpulseWithFriction(): any;
  public totalKE(): any;
  public ignore(): any;
  public getA(): any;
  public getB(): any;
  public preSolve(arb, space): any;
  public getContactPointSet(): any;
  public getNormal(i): any;
  public getPoint(i): any;
  public getDepth(i): any;
  public unthread(): any;
  public update(contacts, handler, a, b): any;
  public preStep(dt, slop, bias): any;
  public applyCachedImpulse(dt_coef): any;
  public applyImpulse(): any;
  public callSeparate(space): any;
  public next(body): any;
}
declare class Constraint {
  public a: any;
  public b: any;
  public errorBias: any;
  public maxBias: any;
  public maxForce: any;
  public next_a: any;
  public next_b: any;
  public space: any;
  public activateBodies(): any;
  public preStep(dt): any;
  public applyCachedImpulse(dt_coef): any;
  public applyImpulse(): any;
  public getImpulse(): any;
  public preSolve(space): any;
  public postSolve(space): any;
  public next(body): any;
}
declare class DampedRotarySpring {
  public damping: any;
  public iSum: any;
  public restAngle: any;
  public springTorqueFunc: any;
  public stiffness: any;
  public target_wrn: any;
  public w_coef: any;
  public preStep(dt): any;
  public applyImpulse(): any;
}
declare class DampedSpring {
  public anchr1: any;
  public anchr2: any;
  public damping: any;
  public n: any;
  public nMass: any;
  public r1: any;
  public r2: any;
  public restLength: any;
  public springForceFunc: any;
  public stiffness: any;
  public target_vrn: any;
  public v_coef: any;
  public preStep(dt): any;
  public applyCachedImpulse(dt_coef): any;
  public applyImpulse(): any;
  public getImpulse(): any;
}
declare class GearJoint {
  public bias: any;
  public iSum: any;
  public jAcc: any;
  public jMax: any;
  public phase: any;
  public ratio: any;
  public ratio_inv: any;
  public preStep(dt): any;
  public applyCachedImpulse(dt_coef): any;
  public applyImpulse(): any;
  public getImpulse(): any;
  public setRatio(value): any;
}
declare class GrooveJoint {
  public anchr2: any;
  public bias: any;
  public clamp: any;
  public grv_a: any;
  public grv_b: any;
  public grv_n: any;
  public grv_tn: any;
  public jAcc: any;
  public jMaxLen: any;
  public k1: any;
  public k2: any;
  public r1: any;
  public r2: any;
  public preStep(dt): any;
  public applyCachedImpulse(dt_coef): any;
  public grooveConstrain(j): any;
  public applyImpulse(): any;
  public getImpulse(): any;
  public setGrooveA(value): any;
  public setGrooveB(value): any;
}
declare let NO_GROUP: any
declare class PinJoint {
  public anchr1: any;
  public anchr2: any;
  public bias: any;
  public dist: any;
  public jnAcc: any;
  public jnMax: any;
  public n: any;
  public nMass: any;
  public r1: any;
  public r2: any;
  public preStep(dt): any;
  public applyCachedImpulse(dt_coef): any;
  public applyImpulse(): any;
  public getImpulse(): any;
}
declare class PivotJoint {
  public anchr1: any;
  public anchr2: any;
  public bias: any;
  public jAcc: any;
  public jMaxLen: any;
  public k1: any;
  public k2: any;
  public r1: any;
  public r2: any;
  public preStep(dt): any;
  public applyCachedImpulse(dt_coef): any;
  public applyImpulse(): any;
  public getImpulse(): any;
}
declare class PolyShape {
  public d: any;
  public n: any;
  public planes: any;
  public tPlanes: any;
  public tVerts: any;
  public type: any;
  public verts: any;
  public compare(v): any;
  public setVerts(verts, offset): any;
}
declare class RatchetJoint {
  public angle: any;
  public bias: any;
  public iSum: any;
  public jAcc: any;
  public jMax: any;
  public phase: any;
  public ratchet: any;
  public preStep(dt): any;
  public applyCachedImpulse(dt_coef): any;
  public applyImpulse(): any;
  public getImpulse(joint): any;
}
declare class RotaryLimitJoint {
  public bias: any;
  public iSum: any;
  public jAcc: any;
  public jMax: any;
  public max: any;
  public min: any;
  public preStep(dt): any;
  public applyCachedImpulse(dt_coef): any;
  public applyImpulse(): any;
  public getImpulse(): any;
}
declare class SegmentShape {
  public a: any;
  public a_tangent: any;
  public b: any;
  public b_tangent: any;
  public bb_b: any;
  public bb_l: any;
  public bb_r: any;
  public bb_t: any;
  public n: any;
  public r: any;
  public ta: any;
  public tb: any;
  public tn: any;
  public type: any;
  public cacheData(p, rot): any;
  public nearestPointQuery(p): any;
  public segmentQuery(a, b): any;
  public setNeighbors(prev, next): any;
  public setEndpoints(a, b): any;
}
declare class Shape {
  public bb_b: any;
  public bb_l: any;
  public bb_r: any;
  public bb_t: any;
  public body: any;
  public collisionCode: any;
  public collision_type: any;
  public d: any;
  public e: any;
  public group: any;
  public hashid: any;
  public layers: any;
  public n: any;
  public p: any;
  public sensor: any;
  public shape: any;
  public space: any;
  public surface_v: any;
  public t: any;
  public u: any;
  public setBody(body): any;
  public setElasticity(e): any;
  public setLayers(layers): any;
  public setSensor(sensor): any;
  public setCollisionType(collision_type): any;
  public getBody(): any;
  public active(): any;
  public setFriction(u): any;
  public cacheBB(): any;
  public update(pos, rot): any;
  public pointQuery(p): any;
  public getBB(): any;
  public hitPoint(start, end): any;
  public hitDist(start, end): any;
}
declare class SimpleMotor {
  public iSum: any;
  public jAcc: any;
  public jMax: any;
  public rate: any;
  public preStep(dt): any;
  public applyCachedImpulse(dt_coef): any;
  public applyImpulse(): any;
  public getImpulse(): any;
}
declare class SlideJoint {
  public anchr1: any;
  public anchr2: any;
  public bias: any;
  public jnAcc: any;
  public jnMax: any;
  public max: any;
  public min: any;
  public n: any;
  public nMass: any;
  public r1: any;
  public r2: any;
  public preStep(dt): any;
  public applyCachedImpulse(dt_coef): any;
  public applyImpulse(): any;
  public getImpulse(): any;
}
declare class Space {
  public activeShapes: any;
  public arbiterList: any;
  public arbiters: any;
  public bodies: any;
  public cachedArbiters: any;
  public collideShapes: any;
  public collisionBias: any;
  public collisionHandlers: any;
  public collisionPersistence: any;
  public collisionSlop: any;
  public constraints: any;
  public contactBuffersHead: any;
  public curr_dt: any;
  public damping: any;
  public defaultHandler: any;
  public enableContactGraph: any;
  public gravity: any;
  public idleSpeedThreshold: any;
  public iterations: any;
  public locked: any;
  public nodeIdleTime: any;
  public nodeNext: any;
  public nodeRoot: any;
  public postStepCallbacks: any;
  public rousedBodies: any;
  public sleepTimeThreshold: any;
  public sleepingComponents: any;
  public stamp: any;
  public staticBody: any;
  public staticShapes: any;
  public reindexShapesForBody(body): any;
  public getCurrentTimeStep(): any;
  public isLocked(): any;
  public addCollisionHandler(a, b, begin, preSolve, postSolve, separate): any;
  public removeCollisionHandler(a, b): any;
  public setDefaultCollisionHandler(begin, preSolve, postSolve, separate): any;
  public lookupHandler(a, b): any;
  public addShape(shape): any;
  public addStaticShape(shape): any;
  public addBody(body): any;
  public addConstraint(constraint): any;
  public filterArbiters(body, filter): any;
  public removeShape(shape): any;
  public removeStaticShape(shape): any;
  public removeBody(body): any;
  public removeConstraint(constraint): any;
  public containsShape(shape): any;
  public containsBody(body): any;
  public containsConstraint(constraint): any;
  public uncacheArbiter(arb): any;
  public eachBody(func): any;
  public eachShape(func): any;
  public eachConstraint(func): any;
  public reindexStatic(): any;
  public reindexShape(shape): any;
  public setIterations(iter): any;
  public useSpatialHash(dim, count): any;
  public activateBody(body): any;
  public deactivateBody(body): any;
  public activate(): any;
  public activateStatic(filter): any;
  public pushArbiter(arb): any;
  public processComponents(dt): any;
  public sleep(): any;
  public sleepWithGroup(group): any;
  public activateShapesTouchingShape(shape): any;
  public pointQuery(point, layers, group, func): any;
  public pointQueryFirst(point, layers, group): any;
  public nearestPointQuery(point, maxDistance, layers, group, func): any;
  public nearestPointQueryNearest(point, maxDistance, layers, group): any;
  public segmentQuery(start, end, layers, group, func): any;
  public segmentQueryFirst(start, end, layers, group): any;
  public bbQuery(bb, layers, group, func): any;
  public shapeQuery(shape, func): any;
  public addPostStepCallback(func): any;
  public runPostStepCallbacks(): any;
  public lock(): any;
  public unlock(runPostStep): any;
  public makeCollideShapes(): any;
  public arbiterSetFilter(arb): any;
  public step(dt): any;
}
declare class SpatialIndex {
  public staticIndex: any;
  public collideStatic(staticIndex, func): any;
}
declare class Vect {
  public x: any;
  public y: any;
}
declare let areaForCircle: any
declare let areaForPoly: any
declare let areaForSegment: any
declare let bb: any
declare let centroidForPoly: any
declare let collideShapes: any
declare let convexHull: any
declare let loopIndexes: any
declare let momentForBox: any
declare let momentForBox2: any
declare let momentForCircle: any
declare let momentForPoly: any
declare let momentForSegment: any
declare let recenterPoly: any
declare let resetShapeIdCounter: any
declare class v {
  public static dot(v1, v2): any;
  public static len(v): any;
  public static len2(x, y): any;
  public static eql(v1, v2): any;
  public static add(v1, v2): any;
  public static sub(v1, v2): any;
  public static neg(v): any;
  public static mult(v, s): any;
  public static cross(v1, v2): any;
  public static perp(v): any;
  public static pvrperp(v): any;
  public static project(v1, v2): any;
  public static rotate(v1, v2): any;
  public static unrotate(v1, v2): any;
  public static lengthsq(v): any;
  public static lengthsq2(x, y): any;
  public static lerp(v1, v2, t): any;
  public static normalize(v): any;
  public static normalize_safe(v): any;
  public static clamp(v, len): any;
  public static lerpconst(v1, v2, d): any;
  public static dist(v1, v2): any;
  public static distsq(v1, v2): any;
  public static near(v1, v2, dist): any;
  public static slerp(v1, v2, t): any;
  public static slerpconst(v1, v2, a): any;
  public static forangle(a): any;
  public static toangle(v): any;
  public static str(v): any;
  public a: any;
  public f: any;
  public p: any;
  public t: any;
  public v_biasx: any;
  public v_biasy: any;
  public vx: any;
  public vy: any;
  public w: any;
  public w_bias: any;
  public x: any;
  public y: any;
  public resetForces(): any;
  public add(v2): any;
  public neg(): any;
  public mult(s): any;
  public project(v2): any;
  public rotate(v2): any;
  public setVel(velocity): any;
  public setAngVel(w): any;
  public setAngleInternal(angle): any;
  public setAngle(angle): any;
  public velocity_func(gravity, damping, dt): any;
  public position_func(dt): any;
  public sub(v2): any;
  public applyForce(force, r): any;
  public applyImpulse(j, r): any;
  public getVelAtPoint(r): any;
  public getVelAtWorldPoint(point): any;
  public getVelAtLocalPoint(point): any;
  public eachShape(func): any;
  public eachConstraint(func): any;
  public eachArbiter(func): any;
  public local2World(v): any;
  public world2Local(v): any;
  public kineticEnergy(): any;
}
declare let vzero: any
