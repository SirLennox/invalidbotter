"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
exports.List = {
    aliases: [
        "listplayers"
    ],
    author: "SirLennox",
    command: "list",
    description: "List players on server",
    version: "1.0",
    onCommand(args, invalidbotter) {
        invalidbotter.writeInChatBox("---------[{#00FF1C-fg}Player-List of selected bots{/}]---------");
        for (let player of invalidbotter.getPlayerListOfSelectedBots()) {
            invalidbotter.writeInChatBox("{#FFFE00-fg}" + player + "{/}");
        }
        invalidbotter.writeInChatBox("---------[{#00FF1C-fg}Player-List of selected bots{/}]---------");
    }
};
