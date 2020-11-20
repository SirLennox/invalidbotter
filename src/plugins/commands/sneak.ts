import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import {Bot} from "mineflayer";

export const Sneak: Command = {
    aliases: [
    ],
    author: "SirLennox",
    command: "sneak",
    description: "Sneak",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length == 1) {
            if(args[0].toUpperCase() === "*") {
                let onlineBots: Bot[] = invalidbotter.getBotsOnServer();
                if(onlineBots.length <= 0) {
                    invalidbotter.log("No bots are online.", "ERROR");
                    return;
                }
                let moving: boolean = onlineBots[0].controlState.sneak;
                for(let bot of onlineBots) {
                    bot.controlState.sneak = !moving;
                }
                if(moving) {
                    invalidbotter.log("Started sneaking!", "SUCCESS");
                }else {
                    invalidbotter.log("Started sneaking!", "SUCCESS");
                }
            }else {
                let bot = invalidbotter.getBotByName(args[0]);
                if(!bot) {
                    console.log("Bot not found!", "ERROR");
                    return;
                }
                let moving = bot.controlState.sneak;
                bot.controlState.sneak = !moving;

                if(moving) {
                    invalidbotter.log("Started sneaking!", "SUCCESS", bot);
                }else {
                    invalidbotter.log("Started sneaking!", "SUCCESS", bot);
                }
            }
        }else {
            invalidbotter.sendUsage("fw <Name/*>");
        }
    }

}