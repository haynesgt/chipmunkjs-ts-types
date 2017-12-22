import * as ts from "typescript";
import * as fs from "fs";

export function hashFile(sourceFile: ts.SourceFile) {

    let nextId = 1;
    let nodes: ts.Node[] = [];
    let hashNode = (node: ts.Node) => {
	if (!('@id' in node)) {
	    nodes[nextId] = node;
	    node['@id'] = nextId++;
	}
	ts.forEachChild(node, hashNode)
    }
    hashNode(sourceFile);
    for (let node of nodes) {
	let saved = {};
	console.log(
	    JSON.stringify(
		node,
		(k, v) => {
		    let r = (typeof(v) === 'object' && ('@id' in v) && v != node) ?
			'@' + v['@id'].toString() :
			v;
		    if (typeof(v) === 'object') {
			if (!('@id' in v)) {
			    v['@id'] = nextId++;
			}
			if(saved[v['@id']]) {
			    return '@' + v['@id'].toString();
			} else {
			    saved[v['@id']] = true;
			}
		    }
		    return r;
		},
		2
	    )
	);
    }
}

let sf = ts.createSourceFile('cp.js', fs.readFileSync('cp.js').toString(), ts.ScriptTarget.ES2015, true);
hashFile(sf);
