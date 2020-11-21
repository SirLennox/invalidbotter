
import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import Module from "../../Module";
import {clearInterval} from "timers";


export const List: Command = {
    aliases: [
        "listplayers"
    ],
    author: "SirLennox",
    command: "list",
    description: "List players on server",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length < 1) {
            invalidbotter.sendUsage("list <Bot>");
            return;
        }
        let bot = invalidbotter.getBotJSONObjectByName(args[0]);
        if (!bot || !bot.bot) {
            console.error("Bot not found!");
            return;
        }
        invalidbotter.writeInChatBox("---------[{#00FF1C-fg}Player-List of " + bot.bot._client.username + " (" + bot.ip + ":" + bot.port + "){/}]---------")
        for(let player of Object.keys(bot.bot.players)) {
            invalidbotter.writeInChatBox("{#FFFE00-fg}" + player + "{/}");
        }
        invalidbotter.writeInChatBox("---------[{#00FF1C-fg}Player-List of " + bot.bot._client.username + " (" + bot.ip + ":" + bot.port + "){/}]---------")
    }



}