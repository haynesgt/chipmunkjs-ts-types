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
            var toClasses = [{ className: path.node.left.object.object.name, property: path.node.left.property.name }];
            while (assignTo.type === 'AssignmentExpression') {
                toClasses.push({ className: assignTo.left.object.object.name, property: assignTo.left.property.name });
                assignTo = assignTo.right;
            }
            for (var _i = 0, toClasses_1 = toClasses; _i < toClasses_1.length; _i++) {
                var target = toClasses_1[_i];
                var currentClass2 = target.className;
                classes.push(currentClass2);
                memberName = target.property;
                if (assignTo.type === 'FunctionExpression') {
                    members[currentClass2] = (members[currentClass2] || []);
                    members[currentClass2].push({
                        name: memberName,
                        params: assignTo.params.map(function (p) { return p.name; })
                    });
                }
                else {
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
    console.error(c);
    if (properties[c] || members[c] || statics[c]) {
        if (c[0].match('[a-z]')) {
            console.log('  let ' + c + ': {');
            if (properties[c]) {
                for (var _b = 0, _c = _.uniq(properties[c].sort()); _b < _c.length; _b++) {
                    var p = _c[_b];
                    console.log('    ' + p + ': any;');
                }
            }
            if (statics[c]) {
                for (var _d = 0, _e = statics[c]; _d < _e.length; _d++) {
                    var s = _e[_d];
                    console.log('    ' + s.name + '(' + s.params.join(', ') + '): any;');
                }
            }
            if (constructors[c]) {
                console.log('    (' + constructors[c].params.join(', ') + '): any;');
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
            console.log('  class ' + c + ' {');
            if (statics[c]) {
                for (var _h = 0, _j = statics[c]; _h < _j.length; _h++) {
                    var s = _j[_h];
                    console.log('    public static ' + s.name + '(' + s.params.join(', ') + '): any;');
                }
            }
            if (properties[c]) {
                for (var _k = 0, _l = _.uniq(properties[c].sort()); _k < _l.length; _k++) {
                    var p = _l[_k];
                    console.log('    public ' + p + ': any;');
                }
            }
            if (constructors[c]) {
                console.log('    constructor(' + constructors[c].params.join(', ') + ');');
            }
            if (members[c]) {
                for (var _m = 0, _o = _.uniq(members[c].sort()); _m < _o.length; _m++) {
                    var m = _o[_m];
                    if (!properties[c] || !(properties[c].includes(m.name))) {
                        console.log('    public ' + m.name + '(' + (m.params).join(', ') + '): any;');
                    }
                }
            }
            console.log('  }');
        }
    }
    else {
        console.log('  let ' + c + ': any');
    }
}
console.log('}');
