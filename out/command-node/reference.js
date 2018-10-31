"use strict";
/**
 * Reference node
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const util_1 = require("./../util");
const resources_1 = require("./../resources");
class Reference extends base_1.default {
    constructor(key) {
        super();
        this.key = key;
    }
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            return super.getCompletion(line, index + 1, end, data);
        }
        if (util_1.strStartsWith(line, start, end, 'minecraft:')) {
            return [resources_1.getResources(this.key), true];
        }
        else {
            return [['minecraft:'], false];
        }
    }
}
exports.default = Reference;
//# sourceMappingURL=reference.js.map