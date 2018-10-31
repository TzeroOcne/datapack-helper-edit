"use strict";
/**
 * Advancement noed
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const resources_1 = require("./../../resources");
const util_1 = require("./../../util");
class AdvancementNode extends base_1.default {
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            data["advancement"] = line.substring(start, index);
            return super.getCompletion(line, index + 1, end, data);
        }
        return [advancementCompletion(line, start, end), true];
    }
}
exports.default = AdvancementNode;
function advancementCompletion(line, start, end) {
    let components = util_1.getResourceComponents(line.substring(start, end));
    let temp = resources_1.getResources("advancements");
    if (components.length === 2 && util_1.indexOf(line, start, end, ':') === -1) {
        //probably completing namespace
        let children = Object.keys(temp);
        temp = temp["minecraft"] || {};
        children.push(...Object.keys(temp).filter(n => n !== '$adv'));
        children.push(...Object.keys((temp["$adv"] || {})));
        return children;
    }
    for (let i = 0; i < components.length - 1; i++) {
        if (temp[components[i]]) {
            temp = temp[components[i]];
        }
        else {
            return [];
        }
    }
    let children = Object.keys(temp).filter(n => n !== '$adv');
    children.push(...Object.keys((temp["$adv"] || {})));
    return children;
}
exports.advancementCompletion = advancementCompletion;
//# sourceMappingURL=advancements.js.map