import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import Module from "../../Module";
import {clearInterval} from "timers";

let index = 0;
const mineflayerViewer = require('prismarine-viewer').mineflayer;
export const Toggle: Command = {
    aliases: [],
    author: "SirLennox",
    command: "viewer",
    description: "View a bot in your browser",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length < 1) {
            invalidbotter.sendUsage("viewer <Name>");
            return;
        }
        let bot = invalidbotter.getBotByName(args[0]);
        if(!bot) {
            console.error("Bot not found!");
            return;
        }
        mineflayerViewer(bot, { port: 3000 + index })
        invalidbotter.log("Bot viewer started on: http://localhost:" + 3000 + index +"/", "SUCCESS", bot);
        invalidbotter.addListenerToBot(bot, "kicked", () => {

        }, "VIEWER_KICK_EVENT");
        const path = [bot.entity.position.clone()]
        invalidbotter.addListenerToBot(bot, "move", () => {
            if (path[path.length - 1].distanceTo(bot.entity.position) > 1) {
                path.push(bot.entity.position.clone())
                // @ts-ignore
                bot.viewer.drawLine('path', path)
            }
        }, "VIEWER_KICK_EVENT");
        index++;
    }



}