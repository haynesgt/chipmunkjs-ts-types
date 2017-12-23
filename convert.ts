// To compile:
//   npm run build

import * as babylon from "babylon";
import traverse from "babel-traverse";
import * as util from "util";
import * as fs from "fs";
import * as _ from "lodash";

let code = fs.readFileSync('node_modules/chipmunk/cp.js').toString();
let ast = babylon.parse(code);

let currentClass = null;
let memberName = null;

let classes = [];
let constructors = {};
let members = {};
let properties = {};
let statics = {};
let parents = {};

let logTraversal = false;

traverse(
    ast,
    {
	enter(path) {
	    if (path.node.type === 'MemberExpression' &&
		path.node.object.type === 'Identifier' &&
		path.node.object.name === 'cp' &&
		path.node.property.type === 'Identifier'
	       ) {
		if (logTraversal) {
		    console.log('Root class:', path.node.property.name);
		}
		currentClass = path.node.property.name;
		memberName = null;
		classes.push(currentClass);
	    }
	    if (path.node.type === 'AssignmentExpression' &&
		path.node.left.type === 'MemberExpression' &&
		path.node.left.object.type === 'Identifier' &&
		path.node.left.object.name === 'cp' &&
		path.node.left.property.type === 'Identifier' &&
		path.node.right.type === 'FunctionExpression'
	       ) {
		constructors[path.node.left.property.name] = {
		    params: path.node.right.params.map((p) => p.name)
		};
	    }

	    if (path.node.type === 'AssignmentExpression' &&
		path.node.left.type === 'MemberExpression' &&
		path.node.left.property.type === 'Identifier' &&
	        path.node.left.object.type === 'ThisExpression'
	       ) {
		if (logTraversal) {
		    console.log('Property name:', path.node.left.property.name);
		}
		properties[currentClass] = (properties[currentClass] || []);
		properties[currentClass].push(path.node.left.property.name);
	    }
	    if (path.node.type === 'AssignmentExpression' &&
		path.node.left.type === 'MemberExpression' &&
		path.node.left.object.type === 'MemberExpression' &&
		path.node.left.object.property.type === 'Identifier' &&
		path.node.left.object.property.name == 'prototype'
	       ) {
		let assignTo = path.node.right;
		let toClasses = [ { className: path.node.left.object.object.name, property: path.node.left.property.name } ];
		while (assignTo.type === 'AssignmentExpression') {
		    toClasses.push({ className: assignTo.left.object.object.name, property: assignTo.left.property.name });
		    assignTo = assignTo.right;
		}

		for (let target of toClasses) {
		    let currentClass2 = target.className;
		    classes.push(currentClass2);
		    memberName = target.property;
		    if (assignTo.type === 'FunctionExpression') {
			members[currentClass2] = (members[currentClass2] || []);
			members[currentClass2].push({
			    name: memberName,
			    params: assignTo.params.map((p) => p.name)
			});
		    } else {
			properties[currentClass2] = (properties[currentClass2] || []);
			properties[currentClass2].push(memberName);
		    }
		    if (logTraversal) {
			console.log('Member name:', path.node.property.name);
		    }
		}
	    }
	    if (path.node.type === 'AssignmentExpression' &&
		path.node.left.type === 'MemberExpression' &&
		path.node.left.object.type === 'MemberExpression' &&
		path.node.left.object.object.type === 'Identifier' &&
		path.node.left.object.object.name === 'cp'
	       ) {
		if (path.node.right.type === 'FunctionExpression') {
		    let className2 = path.node.left.object.property.name;
		    statics[className2] = statics[className2] || [];
		    statics[className2].push({
			name: path.node.left.property.name,
			params: path.node.right.params.map((p) => p.name)
		    });
		} else {
		    console.error('Not implemented: static ' + path.node.right.type);
		}
	    }
	    if (path.node.type === 'AssignmentExpression' &&
		path.node.left.type === 'MemberExpression' &&
		path.node.left.property.type === 'Identifier' &&
		path.node.left.property.name === 'prototype' &&
		path.node.right.type === 'CallExpression' &&
		path.node.right.callee.type === 'MemberExpression' &&
		path.node.right.callee.object.type === 'Identifier' &&
		path.node.right.callee.object.name === 'Object' &&
		path.node.right.callee.property.type === 'Identifier' &&
		path.node.right.callee.property.name === 'create'
	       ) {
		let argument = path.node.right.arguments[0];
		let parent = argument.object.name;
		let child = path.node.left.object.name;
		parents[child] = parents[child] || [];
		parents[child].push(parent);
	    }
	}
    }
);
console.log('declare namespace cp {');
for (let c of _.uniq(classes.sort())) {
    if (properties[c] || members[c] || statics[c]) {
	if (c[0].match('[a-z]')) {
	    console.log('  let ' + c + ': {');
	    if (properties[c]) {
		for (let p of _.uniq(properties[c].sort())) {
		    console.log('    ' + p + ': any;');
		}
	    }
	    if (statics[c]) {
		for (let s of statics[c]) {
		    console.log('    ' + s.name + '(' + s.params.join(', ') + '): any;');
		}
	    }

	    if (constructors[c]) {
		console.log('    (' + constructors[c].params.join(', ') + '): any;');
	    }
	    if (members[c]) {
		for (let m of _.uniq(members[c].sort())) {
		    if (!properties[c] || !(properties[c].includes(m.name))) {
			console.log('    public ' + m.name + '(' + (m.params).join(', ') + '): any;');
		    }
		}
	    }
	    console.log('  }');
	} else {
	    console.log('  class ' + c + (parents[c] ? ' extends ' + parents[c].join(', ') : '') + ' {');
	    if (statics[c]) {
		for (let s of statics[c]) {
		    console.log('    public static ' + s.name + '(' + s.params.join(', ') + '): any;');
		}
	    }
	    if (properties[c]) {
		for (let p of _.uniq(properties[c].sort())) {
		    console.log('    public ' + p + ': any;');
		}
	    }
	    if (constructors[c]) {
		console.log('    constructor(' + constructors[c].params.join(', ') + ');');
	    }
	    if (members[c]) {
		for (let m of _.uniq(members[c].sort())) {
		    if (!properties[c] || !(properties[c].includes(m.name))) {
			console.log('    public ' + m.name + '(' + (m.params).join(', ') + '): any;');
		    }
		}
	    }
	    console.log('  }');
	}
    } else {
	console.log('  let ' + c + ': any');
    }
}
console.log('}');
