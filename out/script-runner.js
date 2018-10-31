"use strict";
/**
 * Run scripts
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vm = require("vm");
const util_1 = require("util");
let context = vm.createContext({
    range: function (a, b = null, c = null) {
        let list = [];
        if (b === null) {
            [a, b] = [b, a]; //swap
            a = 0;
        }
        if (c === null) {
            c = a > b ? -1 : 1;
        }
        let compare = (n) => {
            if (a < b)
                return n < b;
            return n > b;
        };
        for (let i = a; compare(i); i += c)
            list.push(i);
        return list;
    }
});
function toString(obj) {
    if (util_1.isNumber(obj) && !Number.isInteger(obj)) {
        return obj.toFixed(5);
    }
    return obj.toString();
}
function evaluate(code) {
    let result = vm.runInContext(code, context);
    if (util_1.isArray(result)) {
        return result.map(v => toString(v)).join("\n");
    }
    return result.toString();
}
exports.evaluate = evaluate;
Array.prototype.removeDuplicated = function () {
    let contains = [];
    for (let item of this) {
        if (contains.indexOf(item) === -1) {
            contains.push(item);
        }
    }
    return contains;
};
/*
 * Duplicate Removal Command
 */
const LINE_DELIMITER = /\r\n|\n|\r/g;
function removeDuplicates(code) {
    let product = code.split(LINE_DELIMITER).removeDuplicated();
    let result = "";
    for (let item of product) {
        result += (item + `\r\n`);
    }
    result = result.substring(0, result.length - 2);
    return result;
}
exports.removeDuplicates = removeDuplicates;
//# sourceMappingURL=script-runner.js.map