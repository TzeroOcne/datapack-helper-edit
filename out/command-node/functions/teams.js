"use strict";
/**
 * Teams node
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const resources_1 = require("./../../resources");
const util_1 = require("./../../util");
class TeamNode extends base_1.default {
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            return super.getCompletion(line, index + 1, end, data);
        }
        let segment = line.substring(start, end);
        return [resources_1.getResources("teams").map(v => v[0]).filter(v => v.startsWith(segment)), true];
    }
}
exports.default = TeamNode;
//# sourceMappingURL=teams.js.map