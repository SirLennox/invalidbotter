import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import {Bot} from "mineflayer";

export const Sprint: Command = {
    aliases: [
    ],
    author: "SirLennox",
    command: "sprint",
    description: "sprint",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length == 1) {
            if(args[0].toUpperCase() === "*") {
                let onlineBots: Bot[] = invalidbotter.getBotsOnServer();
                if(onlineBots.length <= 0) {
                    invalidbotter.log("No bots are online.", "ERROR");
                    return;
                }
                let moving: boolean = onlineBots[0].controlState.sprint;
                for(let bot of onlineBots) {
                    bot.controlState.sprint = !moving;
                }
                if(moving) {
                    invalidbotter.log("Started sprinting!", "SUCCESS");
                }else {
                    invalidbotter.log("Started sprinting!", "SUCCESS");
                }
            }else {
                let bot = invalidbotter.getBotByName(args[0]);
                if(!bot) {
                    console.log("Bot not found!", "ERROR");
                    return;
                }
                let moving = bot.controlState.sprint;
                bot.controlState.sprint = !moving;

                if(moving) {
                    invalidbotter.log("Started sprinting!", "SUCCESS", bot);
                }else {
                    invalidbotter.log("Started sprinting!", "SUCCESS", bot);
                }
            }
        }else {
            invalidbotter.sendUsage("fw <Name/*>");
        }
    }

}