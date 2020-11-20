import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";

export const Help: Command = {
    aliases: [
        "?"
    ],
    author: "SirLennox",
    command: "help",
    description: "Help page",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if (args.length == 0) {
            invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Help-Page{/}]-----------")
            for (let command of invalidbotter.commandLoader.commands) {
                invalidbotter.writeInChatBox("{#00FF1C-fg}" + command.command + "{/} - {#0067F9-fg}" + command.description + "{/}");
            }
            invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Help-Page{/}]-----------")
        }else {
            let command: Command;
            for(let cmd of invalidbotter.commandLoader.commands) {
                if(cmd.command.toUpperCase() === args[0].toUpperCase() || cmd.aliases.includes(args[0].toUpperCase())) {
                    command = cmd;
                    break;
                }else {
                    for(let alias of cmd.aliases) {
                        if(alias.toUpperCase() === args[0].toUpperCase()) {
                            command = cmd;
                            break;
                        }
                    }
                }
            }
            if(!command) {
                invalidbotter.log("Can't find informations about this command.", "ERROR");
                return;
            }

            invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}" + command.command + "{/}]-----------")
            invalidbotter.writeInChatBox("Name: {#00FF1C-fg}" + command.command + "{/}");

            if(command.aliases.length > 0) {
                invalidbotter.writeInChatBox("Aliases:{#00FF1C-fg}" + command.aliases.map((value, index, array) => " " + value)+ "{/}");
            }
            invalidbotter.writeInChatBox("Version: {#00FF1C-fg}" + command.version + "{/}");
            invalidbotter.writeInChatBox("Description: {#00FF1C-fg}" + command.description + "{/}");
            invalidbotter.writeInChatBox("Author: {#00FF1C-fg}" + command.author + "{/}");
            invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}" + command.command + "{/}]-----------")
        }
    }

}