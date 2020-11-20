"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Left = void 0;
exports.Left = {
    aliases: [],
    author: "SirLennox",
    command: "left",
    description: "Walk left",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 1) {
            if (args[0].toUpperCase() === "*") {
                let onlineBots = invalidbotter.getBotsOnServer();
                if (onlineBots.length <= 0) {
                    invalidbotter.log("No bots are online.", "ERROR");
                    return;
                }
                let moving = onlineBots[0].controlState.left;
                for (let bot of onlineBots) {
                    bot.controlState.left = !moving;
                }
                if (moving) {
                    invalidbotter.log("Stopped moving left!", "SUCCESS");
                }
                else {
                    invalidbotter.log("Started moving left!", "SUCCESS");
                }
            }
            else {
                let bot = invalidbotter.getBotByName(args[0]);
                if (!bot) {
                    console.log("Bot not found!", "ERROR");
                    return;
                }
                let moving = bot.controlState.left;
                bot.controlState.left = !moving;
                if (moving) {
                    invalidbotter.log("Stopped moving left!", "SUCCESS", bot);
                }
                else {
                    invalidbotter.log("Started moving left!", "SUCCESS", bot);
                }
            }
        }
        else {
            invalidbotter.sendUsage("fw <Name/*>");
        }
    }
};
