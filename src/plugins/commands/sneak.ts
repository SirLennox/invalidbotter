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
        let bots = invalidbotter.getSelectedBots();
        if(bots.length < 1) {
            console.log("No bots selected!", "ERROR");
            return;
        }
        let moving = bots[0].controlState.sneak;
        for(let bot of bots) {
            bot.controlState.sneak = !moving;
        }
        if(moving) {
            invalidbotter.log("Stopped sneaking!", "SUCCESS");
        }else {
            invalidbotter.log("Started sneaking!", "SUCCESS");
        }
    }

}