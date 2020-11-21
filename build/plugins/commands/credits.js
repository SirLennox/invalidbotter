"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bots = void 0;
let json = require('../../../package.json');
exports.Bots = {
    aliases: [],
    author: "SirLennox",
    command: "credits",
    description: "Credits",
    version: "1.0",
    onCommand(args, invalidbotter) {
        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Credits{/}]-----------");
        for (let packageName in json.dependencies) {
            invalidbotter.writeInChatBox("{#00FF1C-fg}" + packageName + " v" + json.dependencies[packageName].replace("^", "") + "{/}");
        }
        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Credits{/}]-----------");
    }
};
