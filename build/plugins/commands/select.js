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
            if (args[0].toUpperCase() === "*") {
                const select = !invalidbotter.bots[0].selected;
                for (let bot in invalidbotter.bots) {
                    invalidbotter.bots[bot].selected = select;
                }
                invalidbotter.log("Successfully (de)selected everyone", "SUCCESS");
                invalidbotter.refreshBotBoxes();
            }
            else {
                for (let bot in invalidbotter.bots) {
                    if (invalidbotter.bots[bot].bot._client.username.toUpperCase() == args[0].toUpperCase() && invalidbotter.bots[bot].onServer) {
                        invalidbotter.bots[bot].selected = !invalidbotter.bots[bot].selected;
                        invalidbotter.log("Successfully (de)selected " + invalidbotter.bots[bot].bot._client.username, "SUCCESS");
                        invalidbotter.refreshBotBoxes();
                        return;
                    }
                }
                console.error("Bot not found!");
            }
        }
        else {
            invalidbotter.sendUsage("select <Bot>");
        }
    }
};
