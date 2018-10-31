# datapack-helper
VSCode datapack-helper extension, providing basic template for datapack creation, json schema and autocompletion for command functions.

* Some data used are from PepijnMC's [Minecraft data](https://github.com/PepijnMC/Minecraft), with minor modification (removing the `minecraft:` namespace).
* JSON schema for advancements and loot tables are from Levertion's [minecraft-json-schemas](https://github.com/Levertion/minecraft-json-schemas).

## Usage
### Installation
Bring up the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of VS Code or the `View: Extensions command` (`Ctrl+Shift+X`).

Search for `datapack-helper`

Click the `install` button.

### Commands
```
datapack.initialize
```
Initialize a datapack, generate `.datapack` folter and files for tracking data, and `pack.mcmeta`.

------

```
datapack.reload
```
Parse files, prepare completion data and store them in `.datapack` folder.

Only need to use it when you found that there are some problems completing functions/tags/objectives/teams/advancements names, and those data would be updated when there are file changes.

------

```
datapack.open
Key: Ctrl+Alt+O
```
Open an file based on its name, and create if it does not exist.

Example input:
1. a (Specify the type of file to open/create)
2. `example:1`

List of types of file:
* a: advancements
* l: loot tables
* f: functions
* r: recipes
* bt: block tags
* it: item tags
* ft: function tags

------

```
datapack.addTag
Key: Ctrl+Alt+T
```
Add tags to the current function, would create the tag file if it does not exist.

Example input:
```
minecraft: tick, test:bla
```

### Keybinds
Escape:
```
Key: Alt+/

Example: "a" -> \"a\"
```

Unescape:
```
Key: Alt+\
Example: \"a\" -> "a"
```

Evaluate Js expression:
```
Key: Ctrl+E
```

A `range(start=0, end, step=1): Array<number>` is provided, which is similar to the `range` function in python.

If the result is an array, it would join the array into lines and replace the code with those lines. Otherwise, the code would be replaced directly by its result (to string). If the result is a number but not an integer, 5 decimals would be kept.

![Example](https://thumbs.gfycat.com/VainForcefulDobermanpinscher-size_restricted.gif)

Duplicate Removal
```
Key: Ctrl+Alt+R
```
Remove the duplicate lines in the selected text.
Will reserve the first one met in the sequence, so the order won't change.
![Example](https://t1.picb.cc/uploads/2018/02/03/seaVt.gif)
### Files
```
├ .datapack
├────── sounds.json         Sounds.json.
│                           NEEDS TO BE ENTERED BY THE USER.
├────── entity_tags.json    Entity tags (/tag command) data, containing list of tags.
│                           NEEDS TO BE ENTERED BY THE USER.
├────── advancements.json   Advancement data, would be generated by datapack.reload command.
├────── teams.json          Teams data, would be generated by datapack.reload command.
├────── functionsTag.json   Function tags data, would be generated by datapack.reload command.
├────── itemsTag.json       Item tags data, would be generated by datapack.reload command.
├────── blocksTag.json      Block tags data, would be generated by datapack.reload command.
├────── functions.json      Function data, would be generated by datapack.reload command.
├────── bossbars.json       Bossbar data, would be generated by datapack.reload command.
└────── objectives.json     Scoreboard objectives data, would be generated by datapack.reload command.

```
