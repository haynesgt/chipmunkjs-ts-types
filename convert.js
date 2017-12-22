"use strict";
// To compile:
//   npm run build
exports.__esModule = true;
var babylon = require("babylon");
var babel_traverse_1 = require("babel-traverse");
var fs = require("fs");
var _ = require("lodash");
var code = fs.readFileSync('node_modules/chipmunk/cp.js').toString();
var ast = babylon.parse(code);
var currentClass = null;
var memberName = null;
var classes = [];
var constructors = {};
var members = {};
var properties = {};
var statics = {};
var logTraversal = false;
babel_traverse_1["default"](ast, {
    enter: function (path) {
        if (path.node.type === 'MemberExpression' &&
            path.node.object.type === 'Identifier' &&
            path.node.object.name === 'cp' &&
            path.node.property.type === 'Identifier') {
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
            path.node.right.type === 'FunctionExpression') {
            constructors[path.node.left.property.name] = {
                params: path.node.right.params.map(function (p) { return p.name; })
            };
        }
        if (path.node.type === 'AssignmentExpression' &&
            path.node.left.type === 'MemberExpression' &&
            path.node.left.property.type === 'Identifier' &&
            path.node.left.object.type === 'ThisExpression') {
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
            path.node.left.object.property.name == 'prototype') {
            var assignTo = path.node.right;
            while (assignTo.type === 'AssignmentExpression') {
                assignTo = assignTo.right;
            }
            memberName = path.node.left.property.name;
            if (assignTo.type === 'FunctionExpression') {
                members[currentClass] = (members[currentClass] || []);
                members[currentClass].push({
                    name: memberName,
                    params: assignTo.params.map(function (p) { return p.name; })
                });
            }
            else {
                properties[currentClass] == (properties[currentClass] || []);
                properties[currentClass].push(memberName);
            }
            if (logTraversal) {
                console.log('Member name:', path.node.property.name);
            }
        }
        if (path.node.type === 'AssignmentExpression' &&
            path.node.left.type === 'MemberExpression' &&
            path.node.left.object.type === 'MemberExpression' &&
            path.node.left.object.object.type === 'Identifier' &&
            path.node.left.object.object.name === 'cp') {
            if (path.node.right.type === 'FunctionExpression') {
                var className2 = path.node.left.object.property.name;
                statics[className2] = statics[className2] || [];
                statics[className2].push({
                    name: path.node.left.property.name,
                    params: path.node.right.params.map(function (p) { return p.name; })
                });
            }
            else {
                console.error('Not implemented: static ' + path.node.right.type);
            }
        }
    }
});
console.log('declare namespace cp {');
for (var _i = 0, _a = _.uniq(classes.sort()); _i < _a.length; _i++) {
    var c = _a[_i];
    if (properties[c] || members[c] || statics[c]) {
        console.log('  class ' + c + ' {');
        if (statics[c]) {
            for (var _b = 0, _c = statics[c]; _b < _c.length; _b++) {
                var s = _c[_b];
                console.log('    public static ' + s.name + '(' + s.params.join(', ') + '): any;');
            }
        }
        if (properties[c]) {
            for (var _d = 0, _e = _.uniq(properties[c].sort()); _d < _e.length; _d++) {
                var p = _e[_d];
                console.log('    public ' + p + ': any;');
            }
        }
        if (constructors[c]) {
            console.log('    constructor(' + constructors[c].params.join(', ') + ');');
        }
        if (members[c]) {
            for (var _f = 0, _g = _.uniq(members[c].sort()); _f < _g.length; _f++) {
                var m = _g[_f];
                if (!properties[c] || !(properties[c].includes(m.name))) {
                    console.log('    public ' + m.name + '(' + (m.params).join(', ') + '): any;');
                }
            }
        }
        console.log('  }');
    }
    else {
        console.log('  let ' + c + ': any');
    }
}
console.log('}');
