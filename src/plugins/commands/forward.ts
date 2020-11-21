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
                let bots = invalidbotter.getSelectedBots();
                if(bots.length < 1) {
                    console.log("No bots selected!", "ERROR");
                    return;
                }
                let moving = bots[0].controlState.forward;
                for(let bot of bots) {
                    bot.controlState.forward = !moving;
                }
                if(moving) {
                    invalidbotter.log("Stopped moving forward!", "SUCCESS");
                }else {
                    invalidbotter.log("Started moving forward!", "SUCCESS");
                }
            }

}