import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import {Bot} from "mineflayer";

export const Jump: Command = {
    aliases: [
    ],
    author: "SirLennox",
    command: "jump",
    description: "Jump",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        let bots = invalidbotter.getSelectedBots();
        if(bots.length < 1) {
            console.log("No bots selected!", "ERROR");
            return;
        }
        let moving = bots[0].controlState.jump;
        for(let bot of bots) {
            bot.controlState.jump = !moving;
        }
        if(moving) {
            invalidbotter.log("Stopped jumping!", "SUCCESS");
        }else {
            invalidbotter.log("Started jumping!", "SUCCESS");
        }
    }

}