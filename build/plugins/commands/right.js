"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Right = void 0;
exports.Right = {
    aliases: [],
    author: "SirLennox",
    command: "right",
    description: "Walk right",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 1) {
            if (args[0].toUpperCase() === "*") {
                let onlineBots = invalidbotter.getBotsOnServer();
                if (onlineBots.length <= 0) {
                    invalidbotter.log("No bots are online.", "ERROR");
                    return;
                }
                let moving = onlineBots[0].controlState.right;
                for (let bot of onlineBots) {
                    bot.controlState.right = !moving;
                }
                if (moving) {
                    invalidbotter.log("Stopped moving right!", "SUCCESS");
                }
                else {
                    invalidbotter.log("Started moving right!", "SUCCESS");
                }
            }
            else {
                let bot = invalidbotter.getBotByName(args[0]);
                if (!bot) {
                    console.log("Bot not found!", "ERROR");
                    return;
                }
                let moving = bot.controlState.right;
                bot.controlState.right = !moving;
                if (moving) {
                    invalidbotter.log("Stopped moving right!", "SUCCESS", bot);
                }
                else {
                    invalidbotter.log("Started moving right!", "SUCCESS", bot);
                }
            }
        }
        else {
            invalidbotter.sendUsage("fw <Name/*>");
        }
    }
};
