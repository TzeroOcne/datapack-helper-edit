"use strict";
/**
 * Handle item arguments
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const nbt_1 = require("./nbt");
const resources_1 = require("./../../resources");
const util_1 = require("./../../util");
const tag_1 = require("./tag");
class ItemNode extends base_1.default {
    constructor(test) {
        super();
        this.test = true;
        this.test = test;
    }
    getCompletion(line, start, end, data) {
        let space = util_1.indexOf(line, start, end, " ");
        if (util_1.strStartsWith(line, start, end, "#") && this.test) {
            let brace = util_1.indexOf(line, start, end, "{");
            if (brace !== -1) {
                //nbt
                let result = nbt_1.nbtCompletion("item", line, brace, end, data);
                if (result.completed) {
                    return super.getCompletion(line, result.index + 1, end, data);
                }
                else {
                    return [result.data, true];
                }
            }
            else {
                if (space !== -1) {
                    return super.getCompletion(line, space + 1, end, data);
                }
                else {
                    return [tag_1.tagCompletion("items", line, start + 1, end), true];
                }
            }
        }
        if (util_1.strStartsWith(line, start, end, "minecraft:")) {
            let colon = util_1.indexOf(line, start, end, ":");
            let brace = util_1.indexOf(line, start, end, "{");
            if (brace !== -1) {
                //nbt
                let result = nbt_1.nbtCompletion("item", line, brace, end, data);
                if (result.completed) {
                    return super.getCompletion(line, result.index + 1, end, data);
                }
                else {
                    return [result.data, true];
                }
            }
            else {
                if (space !== -1) {
                    return super.getCompletion(line, space + 1, end, data);
                }
                else {
                    let segment = line.substring(colon + 1);
                    return [resources_1.getResources("#items").filter(v => v.startsWith(segment)), true];
                }
            }
        }
        else {
            if (space !== -1) {
                return super.getCompletion(line, space + 1, end, data);
            }
            else {
                return [["minecraft:"], true];
            }
        }
    }
}
exports.default = ItemNode;
//# sourceMappingURL=item.js.map