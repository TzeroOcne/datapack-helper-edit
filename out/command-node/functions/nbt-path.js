"use strict";
/**
 * Handle NBT path
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./../base");
class NbtPathNode extends base_1.default {
    constructor(base) {
        super();
        this.base = base;
    }
    getCompletion(line, start, end, data) {
        let index = start - 1;
        let inString = false;
        let escape = false;
        while (++index < end) {
            if (inString) {
                if (escape) {
                    escape = false;
                }
                else {
                    switch (line[index]) {
                        case '"':
                            inString = false;
                            break;
                        case '\\':
                            escape = true;
                            break;
                    }
                }
            }
            else {
                switch (line[index]) {
                    case '"':
                        inString = true;
                        break;
                    case ' ':
                        return super.getCompletion(line, index + 1, end, data);
                }
            }
        }
        return [[], false];
    }
}
exports.default = NbtPathNode;
//# sourceMappingURL=nbt-path.js.map