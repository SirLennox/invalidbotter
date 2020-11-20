import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import Module from "../../Module";
import {clearInterval} from "timers";


export const Toggle: Command = {
    aliases: [],
    author: "SirLennox",
    command: "say",
    description: "Say something",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length > 0) {
            for(let bot of invalidbotter.getSelectedBots()) {
                bot.chat(invalidbotter.stringifyArray(args, 0, args.length, " "));
            }
        }else {
            invalidbotter.sendUsage("say <Message>");
        }
    }

}