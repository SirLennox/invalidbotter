"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disconnect = void 0;
exports.Disconnect = {
    aliases: [
        "dc",
        "leave",
        "removebot",
        "delbot",
        "rmbot",
        "deletebot"
    ],
    author: "SirLennox",
    command: "disconnect",
    description: "Disconnect from a server",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 1) {
            if (args[0].toUpperCase() === "*") {
                for (let bot of invalidbotter.getBotsOnServer()) {
                    invalidbotter.removeBot(bot);
                }
                invalidbotter.log("Every bot got removed.", "SUCCESS");
            }
            else {
                let bot = invalidbotter.getBotByName(args[0]);
                if (!bot) {
                    invalidbotter.log("Bot not found!", "ERROR");
                    return;
                }
                invalidbotter.removeBot(bot);
                invalidbotter.log("Successfully removed bot.", "SUCCESS");
            }
        }
        else {
            invalidbotter.sendUsage("disconnect <Name/*>");
        }
    }
};
