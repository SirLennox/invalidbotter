"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Help = void 0;
exports.Help = {
    aliases: [
        "?"
    ],
    author: "SirLennox",
    command: "help",
    description: "Help page",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 0) {
            invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Help-Page{/}]-----------");
            for (let command of invalidbotter.commandLoader.commands) {
                invalidbotter.writeInChatBox("{#00FF1C-fg}" + command.command + "{/} - {#0067F9-fg}" + command.description + "{/}");
            }
            invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Help-Page{/}]-----------");
        }
        else {
            let command;
            for (let cmd of invalidbotter.commandLoader.commands) {
                if (cmd.command.toUpperCase() === args[0].toUpperCase() || cmd.aliases.includes(args[0].toUpperCase())) {
                    command = cmd;
                    break;
                }
                else {
                    for (let alias of cmd.aliases) {
                        if (alias.toUpperCase() === args[0].toUpperCase()) {
                            command = cmd;
                            break;
                        }
                    }
                }
            }
            if (!command) {
                invalidbotter.log("Can't find informations about this command.", "ERROR");
                return;
            }
            invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}" + command.command + "{/}]-----------");
            invalidbotter.writeInChatBox("Name: {#00FF1C-fg}" + command.command + "{/}");
            let aliasesStr = "";
            for (let i = 0; i < command.aliases.length; i++) {
                if (i === command.aliases.length - 1) {
                    aliasesStr += command.aliases[i];
                }
                else {
                    aliasesStr += command.aliases[i] + ",";
                }
            }
            if (aliasesStr != "") {
                invalidbotter.writeInChatBox("Aliases: {#00FF1C-fg}" + aliasesStr + "{/}");
            }
            invalidbotter.writeInChatBox("Version: {#00FF1C-fg}" + command.version + "{/}");
            invalidbotter.writeInChatBox("Description: {#00FF1C-fg}" + command.description + "{/}");
            invalidbotter.writeInChatBox("Author: {#00FF1C-fg}" + command.author + "{/}");
            invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}" + command.command + "{/}]-----------");
        }
    }
};
