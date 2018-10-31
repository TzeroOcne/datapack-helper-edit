"use strict";
/**
 * Handle display slot
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const util_1 = require("./../../util");
const resources_1 = require("./../../resources");
const util_2 = require("util");
const SLOTS = {
    list: {},
    sidebar: {
        team: [
            ...resources_1.getResources("#colors")
        ]
    },
    belowName: {}
};
class DisplaySlotNode extends base_1.default {
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            return super.getCompletion(line, index + 1, end, data);
        }
        let split = line.substring(start, end).split(".");
        let temp = SLOTS;
        for (let i = 0; i < split.length - 1; i++) {
            if (temp[split[i]]) {
                temp = temp[split[i]];
            }
            else {
                return [[], split.length > 1];
            }
        }
        if (util_2.isArray(temp)) {
            return [temp, true];
        }
        else {
            return [Object.keys(temp), true];
        }
    }
}
exports.default = DisplaySlotNode;
//# sourceMappingURL=display-slot.js.map