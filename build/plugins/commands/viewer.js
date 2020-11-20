"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggle = void 0;
let index = 0;
const mineflayerViewer = require('prismarine-viewer').mineflayer;
exports.Toggle = {
    aliases: [],
    author: "SirLennox",
    command: "viewer",
    description: "View a bot in your browser",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length < 1) {
            invalidbotter.sendUsage("viewer <Name>");
            return;
        }
        let bot = invalidbotter.getBotByName(args[0]);
        if (!bot) {
            console.error("Bot not found!");
            return;
        }
        mineflayerViewer(bot, { port: 3000 + index });
        invalidbotter.log("Bot viewer started on: http://127.0.0.1:" + 3000 + index + "/", "SUCCESS", bot);
        invalidbotter.addListenerToBot(bot, "kicked", () => {
        }, "VIEWER_KICK_EVENT");
        const path = [bot.entity.position.clone()];
        invalidbotter.addListenerToBot(bot, "move", () => {
            if (path[path.length - 1].distanceTo(bot.entity.position) > 1) {
                path.push(bot.entity.position.clone());
                // @ts-ignore
                bot.viewer.drawLine('path', path);
            }
        }, "VIEWER_KICK_EVENT");
        index++;
    }
};
