"use strict";
/**
 * Criteria node
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const resources_1 = require("./../../resources");
const util_1 = require("./../../util");
class CriteriaNode extends base_1.default {
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            return super.getCompletion(line, index + 1, end, data);
        }
        let segment = line.substring(start, end);
        return [criteriaCompletion(data["advancement"]).filter(v => v.startsWith(segment)), true];
    }
}
exports.default = CriteriaNode;
function criteriaCompletion(advancement) {
    let components = util_1.getResourceComponents(advancement);
    let temp = resources_1.getResources("advancements");
    for (let i = 0; i < components.length - 1; i++) {
        if (temp[components[i]]) {
            temp = temp[components[i]];
        }
        else {
            return [];
        }
    }
    temp = temp["$adv"][components[components.length - 1]];
    return temp || [];
}
exports.criteriaCompletion = criteriaCompletion;
//# sourceMappingURL=criteria.js.map