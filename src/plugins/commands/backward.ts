import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import {Bot} from "mineflayer";

export const Backward: Command = {
    aliases: [
        "back",
        "bw"
    ],
    author: "SirLennox",
    command: "backward",
    description: "Walk backward",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        let bots = invalidbotter.getSelectedBots();
        if(bots.length < 1) {
            console.log("No bots selected!", "ERROR");
            return;
        }
        let moving = bots[0].controlState.back;
        for(let bot of bots) {
            bot.controlState.back = !moving;
        }
        if(moving) {
            invalidbotter.log("Stopped moving backward!", "SUCCESS");
        }else {
            invalidbotter.log("Started moving backward!", "SUCCESS");
        }
    }

}