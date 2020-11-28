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
           let bots = invalidbotter.getSelectedBots();
        if(bots.length < 1) {
            console.log("No bots selected!", "ERROR");
            return;
        }
        let moving = bots[0].controlState.sprint;
        for(let bot of bots) {
            bot.controlState.sprint = !moving;
        }
        if(moving) {
            invalidbotter.log("Stopped sprinting!", "SUCCESS");
        }else {
            invalidbotter.log("Started sprinting!", "SUCCESS");
        }
    }

}
