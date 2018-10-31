"use strict";
/**
 * Slot function Node
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const util_1 = require("./../../util");
const util_2 = require("util");
const SLOT = {
    armor: [
        "chest", "feet", "head", "legs"
    ],
    weapon: [
        "mainhand", "offhand"
    ],
    enderchest: range(26),
    hotbar: range(8),
    inventory: range(26),
    horse: [
        "saddle", "chest", "armor", ...range(14)
    ],
    villager: range(7)
};
function range(end) {
    let result = [];
    for (let i = 0; i <= end; i++) {
        result.push(i.toString());
    }
    return result;
}
class SlotNode extends base_1.default {
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            return super.getCompletion(line, index + 1, end, data);
        }
        let split = line.substring(start, end).split(".");
        let temp = SLOT;
        for (let i = 0; i < split.length - 1; i++) {
            if (temp[split[i]]) {
                temp = temp[split[i]];
            }
            else {
                return [[], split.length > 1];
            }
        }
        if (util_2.isArray(temp)) {
            return [temp, split.length > 1];
        }
        else {
            return [Object.keys(temp), split.length > 1];
        }
    }
}
exports.default = SlotNode;
//# sourceMappingURL=slot.js.map