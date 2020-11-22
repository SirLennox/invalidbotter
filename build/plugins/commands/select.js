"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
exports.Select = {
    aliases: [
        "sel"
    ],
    author: "SirLennox",
    command: "select",
    description: "Select a bot",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 1) {
            for (let bot in invalidbotter.bots) {
                if (invalidbotter.bots[bot].bot._client.username.toUpperCase() == args[0].toUpperCase() && invalidbotter.bots[bot].onServer) {
                    invalidbotter.bots[bot].selected = !invalidbotter.bots[bot].selected;
                    invalidbotter.log("Successfully selected " + invalidbotter.bots[bot].bot._client.username, "SUCCESS");
                    invalidbotter.refreshBotBoxes();
                    return;
                }
            }
            console.error("Bot not found!");
        }
        else {
            invalidbotter.sendUsage("select <Bot>");
        }
    }
};
