"use strict";
/**
 * Option node
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const util_1 = require("./../util");
class OptionNode extends base_1.default {
    constructor(options) {
        super();
        this.content = options;
    }
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            let segment = line.substring(start, index);
            for (let c of this.content) {
                if (c === segment) {
                    return super.getCompletion(line, index + 1, end, data);
                }
            }
        }
        let segment = line.substring(start, end);
        return [this.content.filter(v => v.startsWith(segment)), false];
    }
}
exports.default = OptionNode;
//# sourceMappingURL=options.js.map