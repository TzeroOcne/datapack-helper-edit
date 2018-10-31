"use strict";
/**
 * Handle scoreboard criteria
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const util_1 = require("./../../util");
const resources_1 = require("./../../resources");
const util_2 = require("util");
let BLOCKS = Object.keys(resources_1.getResources("#blocks"));
let CRITERIA = {
    dummy: {},
    trigger: {},
    deathCount: {},
    playerKillCount: {},
    totalKillCount: {},
    health: {},
    xp: {},
    level: {},
    food: {},
    air: {},
    armor: {},
    teamkill: [resources_1.getResources("#colors")],
    killedByTeam: [resources_1.getResources("#colors")],
    minecraft: {
        "broken:minecraft": resources_1.getResources("#items"),
        "crafted:minecraft": resources_1.getResources("#items"),
        "dropped:minecraft": resources_1.getResources("#items"),
        "killed:minecraft": resources_1.getResources("#entities"),
        "killed_by:minecraft": resources_1.getResources("#entities"),
        "mined:minecraft": BLOCKS,
        "picked_up:minecraft": resources_1.getResources("#items"),
        "used:minecraft": resources_1.getResources("#items"),
        "custom:minecraft": {}
    }
};
let stat = resources_1.getResources("#stats");
for (let n of stat) {
    CRITERIA.minecraft["custom:minecraft"][n] = {};
}
class ScbCriteriaNode extends base_1.default {
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            return super.getCompletion(line, index + 1, end, data);
        }
        let split = line.substring(start, end).split(".");
        let temp = CRITERIA;
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
exports.default = ScbCriteriaNode;
//# sourceMappingURL=scb-criteria.js.map