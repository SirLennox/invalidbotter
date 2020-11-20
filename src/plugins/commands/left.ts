import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import {Bot} from "mineflayer";

export const Left: Command = {
    aliases: [
    ],
    author: "SirLennox",
    command: "left",
    description: "Walk left",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length == 1) {
            if(args[0].toUpperCase() === "*") {
                let onlineBots: Bot[] = invalidbotter.getBotsOnServer();
                if(onlineBots.length <= 0) {
                    invalidbotter.log("No bots are online.", "ERROR");
                    return;
                }
                let moving: boolean = onlineBots[0].controlState.left;
                for(let bot of onlineBots) {
                    bot.controlState.left = !moving;
                }
                if(moving) {
                    invalidbotter.log("Stopped moving left!", "SUCCESS");
                }else {
                    invalidbotter.log("Started moving left!", "SUCCESS");
                }
            }else {
                let bot = invalidbotter.getBotByName(args[0]);
                if(!bot) {
                    console.log("Bot not found!", "ERROR");
                    return;
                }
                let moving = bot.controlState.left;
                bot.controlState.left = !moving;

                if(moving) {
                    invalidbotter.log("Stopped moving left!", "SUCCESS", bot);
                }else {
                    invalidbotter.log("Started moving left!", "SUCCESS", bot);
                }
            }
        }else {
            invalidbotter.sendUsage("fw <Name/*>");
        }
    }

}