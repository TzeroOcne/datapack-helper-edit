"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const DELIMETER_PATTERN = new RegExp("\\" + path.sep, "g");
const PATTERN = /^(([a-z0-9_\-.]+):)?((([a-z0-9_\-.]+)\/)*([a-z0-9_\-.]+)?)$/;
function pathToName(base, fPath) {
    let rel = path.relative(base, fPath);
    if (path.sep === '\\') {
        rel = rel.replace(DELIMETER_PATTERN, '/');
    }
    let first_delimeter = rel.indexOf('/');
    let second = indexOf(rel, first_delimeter + 1, rel.length, '/');
    return rel.substring(0, first_delimeter) + ":" + rel.substring(second + 1);
}
exports.pathToName = pathToName;
function getResourceComponents(str) {
    let m = PATTERN.exec(str);
    if (m) {
        return [m[2] || 'minecraft', ...((m[3] || "").split('/'))];
    }
    return [];
}
exports.getResourceComponents = getResourceComponents;
function readdirAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
exports.readdirAsync = readdirAsync;
function statAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.stat(path, (err, stats) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(stats);
            }
        });
    });
}
exports.statAsync = statAsync;
function readFileAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.readFileAsync = readFileAsync;
function accessAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.access(path, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
exports.accessAsync = accessAsync;
function strStartsWith(str, start, end, startswith) {
    if (end - start < startswith.length)
        return false;
    for (let i = 0; i < startswith.length; i++) {
        if (str[i + start] !== startswith[i])
            return false;
    }
    return true;
}
exports.strStartsWith = strStartsWith;
function indexOf(line, start, end, char) {
    let index = -1;
    for (let i = start; i < end; i++) {
        if (line[i] === char) {
            index = i;
            break;
        }
    }
    return index;
}
exports.indexOf = indexOf;
//# sourceMappingURL=util.js.map