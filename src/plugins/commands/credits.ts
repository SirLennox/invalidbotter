import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";

let json = require('../../../package.json');

export const Bots: Command = {
    aliases: [
    ],
    author: "SirLennox",
    command: "credits",
    description: "Credits",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Credits{/}]-----------")
        for(let packageName in json.dependencies) {
            invalidbotter.writeInChatBox("{#00FF1C-fg}" + packageName + " v" + json.dependencies[packageName].replace("^", "") + "{/}");
        }


        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Credits{/}]-----------")
    }

}