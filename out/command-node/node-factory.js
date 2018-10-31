"use strict";
/**
 * Generate nodes from JSON
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const format_1 = require("./format");
const options_1 = require("./options");
const plain_1 = require("./plain");
const reference_1 = require("./reference");
const advancements_1 = require("./functions/advancements");
const block_1 = require("./functions/block");
const criteria_1 = require("./functions/criteria");
const display_slot_1 = require("./functions/display-slot");
const functions_1 = require("./functions/functions");
const item_1 = require("./functions/item");
const nbt_path_1 = require("./functions/nbt-path");
const nbt_1 = require("./functions/nbt");
const objectives_1 = require("./functions/objectives");
const scb_criteria_1 = require("./functions/scb-criteria");
const selector_1 = require("./functions/selector");
const slot_1 = require("./functions/slot");
const sounds_1 = require("./functions/sounds");
const entity_tag_1 = require("./functions/entity-tag");
const teams_1 = require("./functions/teams");
const util_1 = require("util");
const bossbars_1 = require("./functions/bossbars");
function parseNode(obj, base) {
    let result;
    if (obj["data"] && !obj["function"]) {
        result = new plain_1.default(obj["data"]);
    }
    else if (obj["options"]) {
        result = new options_1.default(obj["options"]);
    }
    else if (obj["key"]) {
        result = new reference_1.default(obj["key"]);
    }
    else if (obj["format"]) {
        result = new format_1.default(obj["format"]);
    }
    else if (obj["function"]) {
        switch (obj["function"]) {
            case "command":
                return base;
            case "target":
                result = new selector_1.default(true);
                break;
            case "targets":
                result = new selector_1.default(true);
                break;
            case "block nbt":
                result = new nbt_1.default("block");
                break;
            case "entity nbt":
                result = new nbt_1.default("entity");
                break;
            case "item tag nbt":
                result = new nbt_1.default("item");
                break;
            case "advancements":
                result = new advancements_1.default();
                break;
            case "advancements-criterion":
                result = new criteria_1.default();
                break;
            case "functions":
                result = new functions_1.default();
                break;
            case "objectives":
                result = new objectives_1.default(false);
                break;
            case "teams":
                result = new teams_1.default();
                break;
            case "sounds":
                result = new sounds_1.default();
                break;
            case "block":
                result = new block_1.default((obj.data || {})["test"] || true);
                break;
            case "tags":
                result = new entity_tag_1.default();
                break;
            case "item":
                result = new item_1.default((obj.data || {})["test"] || true);
                break;
            case "block path":
                result = new nbt_path_1.default("block");
                break;
            case "entity path":
                result = new nbt_path_1.default("entity");
                break;
            case "slot":
                result = new slot_1.default();
                break;
            case "display-slot":
                result = new display_slot_1.default();
                break;
            case "scb-criteria":
                result = new scb_criteria_1.default();
                break;
            case "trigger":
                result = new objectives_1.default(true);
                break;
            case "bossbars":
                result = new bossbars_1.default();
                break;
            case "enchantment":
                break;
            default:
                throw new Error(`Unknown function type: ${obj["function"]}`);
        }
    }
    result.children = parseChildren(obj["children"], base);
    if (obj["optional"])
        result.optional = true;
    return result;
}
function parseChildren(children, base) {
    let result = [];
    for (let c of children) {
        if (util_1.isArray(c)) {
            let result = parseChildren(c, base);
            for (let i of result) {
                setChildren(i, result);
            }
            return result;
        }
        else {
            result.push(parseNode(c, base));
        }
    }
    return result;
}
function setChildren(node, children) {
    if (node.children.length === 0) {
        node.children = children;
    }
    else {
        for (let i of node.children) {
            setChildren(i, children);
        }
    }
}
function getBaseNode(text) {
    let obj = JSON.parse(text);
    let base = new base_1.default();
    base.children = parseChildren(obj["nodes"], base);
    return base;
}
exports.default = getBaseNode;
//# sourceMappingURL=node-factory.js.map