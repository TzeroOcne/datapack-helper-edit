"use strict";
/**
 * Format node
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const NUMBER = /^[+-]?\d+(\.\d+)?/;
const INT = /^[+-]?\d+/;
const LOCATION = /^((((~?[+-]?(\d+(\.\d+)?)|\.\d+)|(~))(\s|$)){3}|(\^([+-]?(\d+(\.\d+)?|\.\d+))?(\s|$)){3})/;
const ROTATION = /^((((~?[+-]?(\d+(\.\d+)?)|\.\d+)|(~))(\s|$)){2})/;
const BOOLEAN = /^(true|false)/;
class FormatNode extends base_1.default {
    constructor(pattern) {
        super();
        switch (pattern) {
            case 'number':
                this.content = NUMBER;
                break;
            case 'int':
                this.content = INT;
                break;
            case 'location':
                this.content = LOCATION;
                break;
            case 'rotation':
                this.content = ROTATION;
                break;
            case 'bool':
                this.content = BOOLEAN;
                break;
            default:
                if (!pattern.startsWith("^")) {
                    throw new Error("Invalid useless pattern");
                }
                this.content = new RegExp(pattern);
                break;
        }
    }
    getCompletion(line, start, end, data) {
        let segment = line.substring(start, end);
        let m = this.content.exec(segment);
        var plues = [];
        if (this.content == LOCATION || this.content == ROTATION) {
            var f = (segment[0] == "^") ? "^ " : "~ ";
            var n = (this.content == ROTATION) ? 2 : 3;
            if (segment.match(/ /g)) n = n - segment.match(/ /g).length;
            for (var i = 0; i < n; i++) {
                plues.push(f.repeat(n - i).substr(0,(n - i)*2 - 1));
            };
        };
        if (m) {
            let length = m[0].length;
            if (length > 0 && m[0][length - 1] !== ' ') {
                length++;
            }
            return super.getCompletion(line, start + length, end, data);
        }
        return [plues, false];
    }
}
exports.default = FormatNode;
//# sourceMappingURL=format.js.map