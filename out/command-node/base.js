"use strict";
/**
 * class BaseNode
 */
Object.defineProperty(exports, "__esModule", { value: true });
class BaseNode {
    constructor() {
        this.children = [];
    }
    getCompletion(line, start, end, data) {
        let completion = [];
        for (let child of this.children) {
            try {
                let result = child.getCompletion(line, start, end, data);
                if (result[1]) {
                    return result;
                }
                else {
                    completion.push(...result[0]);
                }
            }
            catch (e) {
                //Nothing to handle
                console.log(e);
            }
        }
        return [completion, true];
    }
}
exports.default = BaseNode;
//# sourceMappingURL=base.js.map