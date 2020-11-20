"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sneak = void 0;
exports.Sneak = {
    aliases: [],
    author: "SirLennox",
    command: "sneak",
    description: "Sneak",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 1) {
            if (args[0].toUpperCase() === "*") {
                let onlineBots = invalidbotter.getBotsOnServer();
                if (onlineBots.length <= 0) {
                    invalidbotter.log("No bots are online.", "ERROR");
                    return;
                }
                let moving = onlineBots[0].controlState.sneak;
                for (let bot of onlineBots) {
                    bot.controlState.sneak = !moving;
                }
                if (moving) {
                    invalidbotter.log("Started sneaking!", "SUCCESS");
                }
                else {
                    invalidbotter.log("Started sneaking!", "SUCCESS");
                }
            }
            else {
                let bot = invalidbotter.getBotByName(args[0]);
                if (!bot) {
                    console.log("Bot not found!", "ERROR");
                    return;
                }
                let moving = bot.controlState.sneak;
                bot.controlState.sneak = !moving;
                if (moving) {
                    invalidbotter.log("Started sneaking!", "SUCCESS", bot);
                }
                else {
                    invalidbotter.log("Started sneaking!", "SUCCESS", bot);
                }
            }
        }
        else {
            invalidbotter.sendUsage("fw <Name/*>");
        }
    }
};
