"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jump = void 0;
exports.Jump = {
    aliases: [],
    author: "SirLennox",
    command: "jump",
    description: "Jump",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 1) {
            if (args[0].toUpperCase() === "*") {
                let onlineBots = invalidbotter.getBotsOnServer();
                if (onlineBots.length <= 0) {
                    invalidbotter.log("No bots are online.", "ERROR");
                    return;
                }
                let moving = onlineBots[0].controlState.jump;
                for (let bot of onlineBots) {
                    bot.controlState.jump = !moving;
                }
                if (moving) {
                    invalidbotter.log("Stopped jumping!", "SUCCESS");
                }
                else {
                    invalidbotter.log("Started jumping!", "SUCCESS");
                }
            }
            else {
                let bot = invalidbotter.getBotByName(args[0]);
                if (!bot) {
                    console.log("Bot not found!", "ERROR");
                    return;
                }
                let moving = bot.controlState.jump;
                bot.controlState.jump = !moving;
                if (moving) {
                    invalidbotter.log("Stopped jumping!", "SUCCESS", bot);
                }
                else {
                    invalidbotter.log("Started jumping!", "SUCCESS", bot);
                }
            }
        }
        else {
            invalidbotter.sendUsage("fw <Name/*>");
        }
    }
};
