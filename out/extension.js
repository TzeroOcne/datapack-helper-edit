'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const resources = require("./resources");
const fs = require("fs");
const path = require("path");
const node_factory_1 = require("./command-node/node-factory");
const nbt_1 = require("./command-node/functions/nbt");
const util_1 = require("./util");
const script_runner_1 = require("./script-runner");
const fs_extra_1 = require("fs-extra");
function activate(context) {
    let enabled = true;
    vscode.commands.registerTextEditorCommand("datapack.escape", (editor, edit) => {
        if (!enabled)
            return;
        editor.edit((editBuilder) => {
            for (const v of editor.selections) {
                editBuilder.replace(v, nbt_1.escape(editor.document.getText(v)));
            }
        }).then((value) => {
        });
    });
    vscode.commands.registerTextEditorCommand("datapack.unescape", (editor, edit) => {
        if (!enabled)
            return;
        editor.edit((editBuilder) => {
            for (const v of editor.selections) {
                editBuilder.replace(v, nbt_1.unescape(editor.document.getText(v)));
            }
        }).then((value) => {
        });
    });
    vscode.commands.registerTextEditorCommand("datapack.evaluate", (editor, edit) => {
        if (!enabled)
            return;
        editor.edit((editBuilder) => {
            for (const v of editor.selections) {
                editBuilder.replace(v, script_runner_1.evaluate(editor.document.getText(v)));
            }
        }).then((value) => {
            if (!value)
                vscode.window.showErrorMessage("replace failed");
        });
    });
    vscode.commands.registerTextEditorCommand("datapack.removeduplicates", (editor, edit) => {
        if (!enabled)
            return;
        editor.edit((editBuilder) => {
            for (const v of editor.selections) {
                editBuilder.replace(v, script_runner_1.removeDuplicates(editor.document.getText(v)));
            }
        }).then((value) => {
            if (!value)
                vscode.window.showErrorMessage("replace failed");
        });
    });
    vscode.commands.registerCommand("datapack.open", () => {
        if (!enabled)
            return;
        vscode.window.showInputBox({ placeHolder: "a/l/bt/et/it/ft/f/r", prompt: "a: advancements, l: loot-tables, bt: block-tag, et: entity-type-tag, it: item-tag, ft: function-tag, f: functions, r: recipe" }).then(choice => {
            let extension = "";
            let tag = "";
            choice = choice.toLowerCase();
            switch (choice) {
                case "a":
                    choice = "advancements";
                    extension = ".json";
                    break;
                case "l":
                    choice = "loot_tables";
                    extension = ".json";
                    break;
                case "r":
                    choice = "recipes";
                    extension = ".json";
                    break;
                case "bt":
                    tag = "blocks/";
                    choice = "tags";
                    extension = ".json";
                    break;
                case "et":
                    tag = "entity_types/";
                    choice = "tags";
                    extension = ".json";
                    break;
                case "it":
                    tag = "items/";
                    choice = "tags";
                    extension = ".json";
                    break;
                case "ft":
                    tag = "functions";
                    choice = "tags";
                    extension = ".json";
                    break;
                case "f":
                    choice = "functions";
                    extension = ".mcfunction";
                    break;
                default:
                    vscode.window.showErrorMessage("Invalid mode");
                    return;
            }
            vscode.window.showInputBox({ placeHolder: `example:${choice}_a`, prompt: `Name of the ${choice}` }).then(v => {
                if (v) {
                    let components = util_1.getResourceComponents(v);
                    if (components.length === 0) {
                        vscode.window.showErrorMessage("Invalid name");
                    }
                    else {
                        if (tag !== "")
                            components.splice(1, 0, tag);
                        let p = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'data', components[0], choice, ...components.slice(1)) + extension;
                        util_1.accessAsync(p).then(() => {
                            vscode.workspace.openTextDocument(vscode.Uri.file(p)).then(document => {
                                vscode.window.showTextDocument(document);
                            });
                        }).catch(() => {
                            fs_extra_1.outputFile(p, extension == ".mcfunction" ? `# ${v}` : "{}", err => {
                                if (err) {
                                    vscode.window.showErrorMessage(`Error creating the ${choice} file`);
                                }
                                else {
                                    vscode.workspace.openTextDocument(vscode.Uri.file(p)).then(document => {
                                        vscode.window.showTextDocument(document);
                                    });
                                }
                            });
                        });
                    }
                }
            });
        });
    });
    vscode.commands.registerCommand("datapack.addTag", () => {
        if (!vscode.window.activeTextEditor || vscode.window.activeTextEditor.document.isUntitled || !vscode.window.activeTextEditor.document.uri.fsPath.endsWith(".mcfunction"))
            return;
        vscode.window.showInputBox({ prompt: "List of tags to add to the current function, use `,` to seperate different tags.", value: "minecraft:tick" }).then(v => {
            if (!v)
                return;
            let current = util_1.pathToName(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'data'), vscode.window.activeTextEditor.document.uri.fsPath);
            current = current.substring(0, current.length - 11);
            for (let tag of v.split(",").map(x => x.trim())) {
                let components = util_1.getResourceComponents(tag);
                if (components.length === 0) {
                    vscode.window.showErrorMessage("Invalid name: " + tag);
                    continue;
                }
                let p = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'data', components[0], 'tags', 'functions', ...components.slice(1)) + ".json";
                fs.readFile(p, "utf-8", (err, data) => {
                    let functions = [];
                    let replace = false;
                    if (!err) {
                        try {
                            let d = JSON.parse(data);
                            replace = d.replace || false;
                            functions = d.values || [];
                        }
                        catch (e) {
                            vscode.window.showErrorMessage("Error reading tag file: " + p);
                        }
                    }
                    if (functions.indexOf(current) === -1)
                        functions.push(current);
                    fs_extra_1.outputFile(p, JSON.stringify({ replace: replace, values: functions }), err => {
                        if (err)
                            vscode.window.showErrorMessage("Error writing tag file" + p);
                    });
                });
            }
        });
    });
    if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length !== 1) {
        vscode.window.showErrorMessage("There must be 1 and only 1 workspace folder for the datapack");
        enabled = false;
    }
    else {
        fs.access(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '/pack.mcmeta'), err => {
            if (!err) {
                fs.access(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '/.datapack/'), err => {
                    if (!err) {
                        enabled = true;
                        resources.loadFiles();
                    }
                    else {
                        resources.initialize();
                    }
                });
            }
        });
    }
    //file change watcher
    let functionWatcher = vscode.workspace.createFileSystemWatcher(vscode.workspace.workspaceFolders[0].uri.fsPath + "/data/*/functions/**/*.mcfunction");
    functionWatcher.onDidChange(e => {
        if (!enabled)
            return;
        resources.reloadFunction(e.fsPath);
    });
    functionWatcher.onDidCreate(e => {
        if (!enabled)
            return;
        resources.reloadFunction(e.fsPath);
    });
    functionWatcher.onDidDelete(e => {
        if (!enabled)
            return;
        setImmediate(() => {
            resources.readFunctions().catch(err => {
                if (err)
                    vscode.window.showErrorMessage("Error reading functions: " + err);
            });
        });
    });
    let advancementWatcher = vscode.workspace.createFileSystemWatcher(vscode.workspace.workspaceFolders[0].uri.fsPath + "/data/*/advancements/**/*.json");
    advancementWatcher.onDidChange(e => {
        if (!enabled)
            return;
        resources.reloadAdvancement(e.fsPath);
    });
    advancementWatcher.onDidCreate(e => {
        if (!enabled)
            return;
        resources.reloadAdvancement(e.fsPath);
    });
    advancementWatcher.onDidDelete(e => {
        if (!enabled)
            return;
        setImmediate(() => {
            resources.readAdvancements().catch(err => {
                if (err)
                    vscode.window.showErrorMessage("Error reading advancements: " + err);
            });
        });
    });
    let configWatcher = vscode.workspace.createFileSystemWatcher(vscode.workspace.workspaceFolders[0].uri.fsPath + "/.datapack/*.json", true, false, true);
    configWatcher.onDidChange(e => {
        if (!enabled)
            return;
        if (e.fsPath.endsWith("sounds.json") || e.fsPath.endsWith("entity_tags.json")) {
            setImmediate(() => {
                resources.loadFiles();
            });
        }
    });
    let tagWatcher = vscode.workspace.createFileSystemWatcher(vscode.workspace.workspaceFolders[0].uri.fsPath + "/data/*/tags/**/*.json", false, true, false);
    tagWatcher.onDidCreate(e => {
        if (!enabled)
            return;
        resources.reloadTags(e.fsPath);
    });
    tagWatcher.onDidDelete(e => {
        if (!enabled)
            return;
        let t = util_1.getResourceComponents(util_1.pathToName(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, "data"), e.fsPath))[1];
        setImmediate(() => {
            resources.readTags(t).catch(err => {
                if (err)
                    vscode.window.showErrorMessage("Error reading tags: " + err);
            });
        });
    });
    let baseNode = node_factory_1.default(fs.readFileSync(path.join(__dirname + "./../ref/command-format.json"), "utf-8"));
    vscode.languages.registerCompletionItemProvider('mcfunction', {
        provideCompletionItems(document, position, token, context) {
            if (!enabled)
                return [];
            if (document.lineAt(position.line).text.length !== 0) {
                let char = document.lineAt(position.line).text.charCodeAt(0);
                if (char < 97 || char > 122)
                    return [];
            }
            return baseNode.getCompletion(document.lineAt(position.line).text, 0, position.character, {})[0].map(v => new vscode.CompletionItem(v));
        }
    }, ...[".", ",", "[", "{", " ", "/", ":", "=", "!", "_", "#"]);
    vscode.commands.registerCommand("datapack.initialize", () => {
        if (!enabled)
            return;
        resources.initialize();
        vscode.commands.executeCommand("datapack.reload");
    });
    vscode.commands.registerCommand("datapack.reload", () => {
        if (!enabled)
            return;
        resources.readFunctions().then().catch(err => {
            if (err)
                vscode.window.showErrorMessage("Error reading functions: " + err);
        });
        resources.readAdvancements().then().catch(err => {
            if (err)
                vscode.window.showErrorMessage("Error reading advancements: " + err);
        });
        resources.readTags("functions").then().catch(err => {
            if (err)
                vscode.window.showErrorMessage("Error reading function tags: " + err);
        });
        resources.readTags("blocks").then().catch(err => {
            if (err)
                vscode.window.showErrorMessage("Error reading block tags: " + err);
        });
        resources.readTags("entity_types").then().catch(err => {
            if (err)
                vscode.window.showErrorMessage("Error reading entity type tags: " + err);
        });
        resources.readTags("items").then().catch(err => {
            if (err)
                vscode.window.showErrorMessage("Error reading item tags: " + err);
        });
    });
    vscode.workspace.onDidChangeWorkspaceFolders(e => {
        if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length !== 1) {
            vscode.window.showErrorMessage("There must be 1 and only 1 workspace folder for the datapack");
            enabled = false;
        }
        else {
            fs.access(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '/pack.mcmeta'), err => {
                if (!err) {
                    fs.access(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '/.datapack/'), err => {
                        if (!err) {
                            enabled = true;
                            resources.loadFiles();
                        }
                        else {
                            resources.initialize();
                        }
                    });
                }
            });
        }
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map