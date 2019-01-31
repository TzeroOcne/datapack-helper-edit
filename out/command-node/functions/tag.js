"use strict";
/**
 * Datapack tag node
 */
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("./../../resources");
const util_1 = require("./../../util");
function tagCompletion(type, line, start, end) {
    let components = util_1.getResourceComponents(line.substring(start, end));
    let temp;
    switch (type) {
        case 'functions':
            temp = resources_1.getResources("functionTags");
            break;
        case 'blocks':
            temp = resources_1.getResources("blockTags");
            break;
        case 'entity_types':
            temp = resources_1.getResources("entityTypeTags");
            break;
        case 'items':
            temp = resources_1.getResources("itemTags");
            break;
        default:
            console.log("Invalid type");
            return [];
    }
    if (components.length === 2 && util_1.indexOf(line, start, end, ':') === -1) {
        //probably completing namespace
        let children = Object.keys(temp);
        temp = temp["minecraft"] || {};
        children.push(...Object.keys(temp).filter(n => n !== '$tags'));
        children.push(...(temp["$tags"] || []));
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
    let children = Object.keys(temp).filter(n => n !== '$tags');
    children.push(...(temp["$tags"] || []));
    return children;
}
exports.tagCompletion = tagCompletion;
//# sourceMappingURL=tag.js.map