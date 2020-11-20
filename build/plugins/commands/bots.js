"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bots = void 0;
exports.Bots = {
    aliases: [],
    author: "SirLennox",
    command: "bots",
    description: "Show all bots",
    version: "1.0",
    onCommand(args, invalidbotter) {
        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Bots{/}]-----------");
        for (let bot of invalidbotter.bots) {
            invalidbotter.writeInChatBox("{#00FF1C-fg}" + bot.bot._client.username + "{/} - {#0067F9-fg}" + bot.ip + ":" + bot.port + "{/}");
        }
        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Bots{/}]-----------");
    }
};
