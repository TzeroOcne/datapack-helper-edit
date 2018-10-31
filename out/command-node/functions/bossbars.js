"use strict";
/*
 * Bossbars node
 *
*/
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const resources_1 = require("./../../resources");
const util_1 = require("./../../util");
class BossbarNode extends base_1.default {
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            return super.getCompletion(line, index + 1, end, data);
        }
        let segment = line.substring(start, end);
        return [bossbarCompletion(line, start, end), true];
    }
}
exports.default = BossbarNode;
function bossbarCompletion(line, start, end) {
    let components = util_1.getResourceComponents(line.substring(start, end));
    let temp = resources_1.getResources("bossbars");
    if (components.length === 2 && util_1.indexOf(line, start, end, ':') === -1) {
        let children = Object.keys(temp);
        temp = temp["minecraft"] || [];
        children.push(...temp.map(v => v[0]));
        return children;
    }
    let children = [];
    for (let i = 0; i < components.length - 1; i++) {
        if (temp[components[i]]) {
            children.push(...(temp[components[i]].map(v => v[0])));
        }
        else {
            return [];
        }
    }
    return children;
}
exports.bossbarCompletion = bossbarCompletion;
//# sourceMappingURL=bossbars.js.map