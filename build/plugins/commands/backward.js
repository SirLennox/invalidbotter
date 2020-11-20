"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backward = void 0;
exports.Backward = {
    aliases: [
        "back",
        "bw"
    ],
    author: "SirLennox",
    command: "backward",
    description: "Walk backward",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 1) {
            if (args[0].toUpperCase() === "*") {
                let onlineBots = invalidbotter.getBotsOnServer();
                if (onlineBots.length <= 0) {
                    invalidbotter.log("No bots are online.", "ERROR");
                    return;
                }
                let moving = onlineBots[0].controlState.back;
                for (let bot of onlineBots) {
                    bot.controlState.back = !moving;
                }
                if (moving) {
                    invalidbotter.log("Stopped moving back!", "SUCCESS");
                }
                else {
                    invalidbotter.log("Started moving back!", "SUCCESS");
                }
            }
            else {
                let bot = invalidbotter.getBotByName(args[0]);
                if (!bot) {
                    console.log("Bot not found!", "ERROR");
                    return;
                }
                let moving = bot.controlState.back;
                bot.controlState.back = !moving;
                if (moving) {
                    invalidbotter.log("Stopped moving back!", "SUCCESS", bot);
                }
                else {
                    invalidbotter.log("Started moving back!", "SUCCESS", bot);
                }
            }
        }
        else {
            invalidbotter.sendUsage("fw <Name/*>");
        }
    }
};
