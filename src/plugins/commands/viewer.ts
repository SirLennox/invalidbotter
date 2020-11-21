import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import Module from "../../Module";
import {clearInterval} from "timers";

let index = 0;

export const Toggle: Command = {
    aliases: [],
    author: "SirLennox",
    command: "viewer",
    description: "View a bot in your browser",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length < 1) {
            invalidbotter.sendUsage("viewer <Name>");
            return;
        }
        let bot = invalidbotter.getBotByName(args[0]);
        if(!bot) {
            console.error("Bot not found!");
            return;
        }
        console.warn("InDev, please wait for updates...");
/*        mineflayerViewer(bot, { port: 3000 + index });
        index++;*/
    }



}
