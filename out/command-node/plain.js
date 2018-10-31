"use strict";
/**
 * Plain text node
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const util_1 = require("./../util");
class PlainNode extends base_1.default {
    constructor(name) {
        super();
        this.content = name;
    }
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            if (line.substring(start, index) === this.content) {
                return super.getCompletion(line, index + 1, end, data);
            }
        }
        let segment = line.substring(start, end);
        if (this.content.startsWith(segment))
            return [[this.content], false];
        return [[], false];
    }
}
exports.default = PlainNode;
//# sourceMappingURL=plain.js.map