
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

        invalidbotter.writeInChatBox("---------[{#00FF1C-fg}Player-List of selected bots{/}]---------")
        for(let player of invalidbotter.getPlayerListOfSelectedBots()) {
            invalidbotter.writeInChatBox("{#FFFE00-fg}" + player + "{/}");
        }
        invalidbotter.writeInChatBox("---------[{#00FF1C-fg}Player-List of selected bots{/}]---------")
    }



}