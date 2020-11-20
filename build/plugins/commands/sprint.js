"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprint = void 0;
exports.Sprint = {
    aliases: [],
    author: "SirLennox",
    command: "sprint",
    description: "sprint",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 1) {
            if (args[0].toUpperCase() === "*") {
                let onlineBots = invalidbotter.getBotsOnServer();
                if (onlineBots.length <= 0) {
                    invalidbotter.log("No bots are online.", "ERROR");
                    return;
                }
                let moving = onlineBots[0].controlState.sprint;
                for (let bot of onlineBots) {
                    bot.controlState.sprint = !moving;
                }
                if (moving) {
                    invalidbotter.log("Started sprinting!", "SUCCESS");
                }
                else {
                    invalidbotter.log("Started sprinting!", "SUCCESS");
                }
            }
            else {
                let bot = invalidbotter.getBotByName(args[0]);
                if (!bot) {
                    console.log("Bot not found!", "ERROR");
                    return;
                }
                let moving = bot.controlState.sprint;
                bot.controlState.sprint = !moving;
                if (moving) {
                    invalidbotter.log("Started sprinting!", "SUCCESS", bot);
                }
                else {
                    invalidbotter.log("Started sprinting!", "SUCCESS", bot);
                }
            }
        }
        else {
            invalidbotter.sendUsage("fw <Name/*>");
        }
    }
};
