"use strict";
/**
 * Objectives node
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const resources_1 = require("./../../resources");
const util_1 = require("./../../util");
class ObjectiveNode extends base_1.default {
    constructor(trigger = false) {
        super();
        this.trigger = false;
        this.trigger = trigger;
    }
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            return super.getCompletion(line, index + 1, end, data);
        }
        let segment = line.substring(start, end);
        return [resources_1.getResources("objectives").filter(v => v[0].startsWith(segment) && (!this.trigger || v[1] === 'trigger')).map(v => v[0]), true];
    }
}
exports.default = ObjectiveNode;
//# sourceMappingURL=objectives.js.map