"use strict";
/**
 * Handle block argument
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
const nbt_1 = require("./nbt");
const selector_1 = require("./selector");
const resources_1 = require("./../../resources");
const util_1 = require("./../../util");
const tag_1 = require("./tag");
class BlockNode extends base_1.default {
    constructor(test) {
        super();
        this.test = true;
        this.test = test;
    }
    getCompletion(line, start, end, data) {
        let space = util_1.indexOf(line, start, end, " ");
        if (util_1.strStartsWith(line, start, end, "#") && this.test) {
            let square = util_1.indexOf(line, start, end, "[");
            let brace = util_1.indexOf(line, start, end, "{");
            if (brace !== -1) {
                //nbt
                let result = nbt_1.nbtCompletion("block", line, brace, end, data);
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
                    if (square !== -1) {
                        //don't know what block states
                        return [[], true];
                    }
                    else {
                        return [tag_1.tagCompletion("blocks", line, start + 1, end), true];
                    }
                }
            }
        }
        if (util_1.strStartsWith(line, start, end, "minecraft:")) {
            let colon = util_1.indexOf(line, start, end, ":");
            let square = util_1.indexOf(line, start, end, "[");
            let brace = util_1.indexOf(line, start, end, "{");
            if (brace !== -1) {
                //nbt
                let result = nbt_1.nbtCompletion("block", line, brace, end, data);
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
                    if (square !== -1) {
                        let blockId = line.substring(colon + 1, square);
                        let states = Object.keys(resources_1.getResources("#blocks")[blockId] || {});
                        let index = square + 1;
                        while (index < end && line[index] !== ']') {
                            let eqSign = util_1.indexOf(line, index, end, "=");
                            let state = line.substring(index, eqSign);
                            if (eqSign !== -1) {
                                let result = selector_1.skipArgument(line, eqSign + 1, end);
                                if (result.completed) {
                                    index = result.index;
                                    let i = states.indexOf(state);
                                    if (i !== -1) {
                                        states.splice(i, 1);
                                    }
                                }
                                else {
                                    return [(resources_1.getResources("#blocks")[blockId] || {})[state] || [], true];
                                }
                            }
                            else {
                                return [states, true];
                            }
                        }
                        if (index === end) {
                            return [states, true];
                        }
                    }
                    else {
                        let segment = line.substring(colon + 1);
                        return [Object.keys(resources_1.getResources("#blocks")).filter(v => v.startsWith(segment)), true];
                    }
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
exports.default = BlockNode;
//# sourceMappingURL=block.js.map