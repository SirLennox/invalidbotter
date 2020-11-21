"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggle = void 0;
let index = 0;
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
        console.warn("InDev, please wait for updates...");
        /*        mineflayerViewer(bot, { port: 3000 + index });
                index++;*/
    }
};
