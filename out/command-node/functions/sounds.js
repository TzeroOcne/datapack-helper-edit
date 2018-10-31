"use strict";
/**
 * Handle sounds.json completion
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const util_1 = require("./../../util");
const resources_1 = require("./../../resources");
class SoundNode extends base_1.default {
    getCompletion(line, start, end, data) {
        let index = util_1.indexOf(line, start, end, ' ');
        if (index !== -1) {
            return super.getCompletion(line, index + 1, end, data);
        }
        let split = line.substring(start, end).split(".");
        let temp = resources_1.getResources("sounds");
        for (let i = 0; i < split.length - 1; i++) {
            if (temp[split[i]]) {
                temp = temp[split[i]];
            }
            else {
                return [[], split.length > 1];
            }
        }
        return [Object.keys(temp), split.length > 1];
    }
}
exports.default = SoundNode;
//# sourceMappingURL=sounds.js.map