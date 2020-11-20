"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forward = void 0;
exports.Forward = {
    aliases: [
        "fw"
    ],
    author: "SirLennox",
    command: "forward",
    description: "Walk forward",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 1) {
            if (args[0].toUpperCase() === "*") {
                let onlineBots = invalidbotter.getBotsOnServer();
                if (onlineBots.length <= 0) {
                    invalidbotter.log("No bots are online.", "ERROR");
                    return;
                }
                let moving = onlineBots[0].controlState.forward;
                for (let bot of onlineBots) {
                    bot.controlState.forward = !moving;
                }
                if (moving) {
                    invalidbotter.log("Stopped moving forward!", "SUCCESS");
                }
                else {
                    invalidbotter.log("Started moving forward!", "SUCCESS");
                }
            }
            else {
                let bot = invalidbotter.getBotByName(args[0]);
                if (!bot) {
                    console.log("Bot not found!", "ERROR");
                    return;
                }
                let moving = bot.controlState.forward;
                bot.controlState.forward = !moving;
                if (moving) {
                    invalidbotter.log("Stopped moving forward!", "SUCCESS", bot);
                }
                else {
                    invalidbotter.log("Started moving forward!", "SUCCESS", bot);
                }
            }
        }
        else {
            invalidbotter.sendUsage("fw <Name/*>");
        }
    }
};
