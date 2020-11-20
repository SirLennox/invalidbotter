import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import {Bot} from "mineflayer";

export const Forward: Command = {
    aliases: [
        "fw"
    ],
    author: "SirLennox",
    command: "forward",
    description: "Walk forward",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length == 1) {
            if(args[0].toUpperCase() === "*") {
                let onlineBots: Bot[] = invalidbotter.getBotsOnServer();
                if(onlineBots.length <= 0) {
                    invalidbotter.log("No bots are online.", "ERROR");
                    return;
                }
                let moving: boolean = onlineBots[0].controlState.forward;
                for(let bot of onlineBots) {
                    bot.controlState.forward = !moving;
                }
                if(moving) {
                    invalidbotter.log("Stopped moving forward!", "SUCCESS");
                }else {
                    invalidbotter.log("Started moving forward!", "SUCCESS");
                }
            }else {
                let bot = invalidbotter.getBotByName(args[0]);
                if(!bot) {
                    console.log("Bot not found!", "ERROR");
                    return;
                }
                let moving = bot.controlState.forward;
                bot.controlState.forward = !moving;

                if(moving) {
                    invalidbotter.log("Stopped moving forward!", "SUCCESS", bot);
                }else {
                    invalidbotter.log("Started moving forward!", "SUCCESS", bot);
                }
            }
        }else {
            invalidbotter.sendUsage("fw <Name/*>");
        }
    }

}