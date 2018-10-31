"use strict";
/**
 * command function node
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const resources_1 = require("./../../resources");
const util_1 = require("./../../util");
const tag_1 = require("./tag");
class FunctionNode extends base_1.default {
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            return super.getCompletion(line, index + 1, end, data);
        }
        return [functionCompletion(line, start, end), true];
    }
}
exports.default = FunctionNode;
function functionCompletion(line, start, end) {
    if (util_1.strStartsWith(line, start, end, "#")) {
        return tag_1.tagCompletion("functions", line, start + 1, end);
    }
    let components = util_1.getResourceComponents(line.substring(start, end));
    let temp = resources_1.getResources("functions");
    if (components.length === 2 && util_1.indexOf(line, start, end, ':') === -1) {
        //probably completing namespace
        let children = Object.keys(temp);
        temp = temp["minecraft"] || {};
        children.push(...Object.keys(temp).filter(n => n !== '$func'));
        children.push(...(temp["$func"] || []));
        return children;
    }
    for (let i = 0; i < components.length - 1; i++) {
        if (temp[components[i]]) {
            temp = temp[components[i]];
        }
        else {
            return [];
        }
    }
    let children = Object.keys(temp).filter(n => n !== '$func');
    children.push(...(temp["$func"] || []));
    return children;
}
exports.functionCompletion = functionCompletion;
//# sourceMappingURL=functions.js.map