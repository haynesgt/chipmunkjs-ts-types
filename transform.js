"use strict";
exports.__esModule = true;
var ts = require("typescript");
var fs = require("fs");
function hashFile(sourceFile) {
    var nextId = 1;
    var nodes = [];
    var hashNode = function (node) {
        if (!('@id' in node)) {
            nodes[nextId] = node;
            node['@id'] = nextId++;
        }
        ts.forEachChild(node, hashNode);
    };
    hashNode(sourceFile);
    var _loop_1 = function (node) {
        var saved = {};
        console.log(JSON.stringify(node, function (k, v) {
            var r = (typeof (v) === 'object' && ('@id' in v) && v != node) ?
                '@' + v['@id'].toString() :
                v;
            if (typeof (v) === 'object') {
                if (!('@id' in v)) {
                    v['@id'] = nextId++;
                }
                if (saved[v['@id']]) {
                    return '@' + v['@id'].toString();
                }
                else {
                    saved[v['@id']] = true;
                }
            }
            return r;
        }, 2));
    };
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        _loop_1(node);
    }
}
exports.hashFile = hashFile;
var sf = ts.createSourceFile('cp.js', fs.readFileSync('cp.js').toString(), ts.ScriptTarget.ES2015, true);
hashFile(sf);
