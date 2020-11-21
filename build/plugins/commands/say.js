"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggle = void 0;
exports.Toggle = {
    aliases: [],
    author: "SirLennox",
    command: "say",
    description: "Say something",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length > 0) {
            let bots = invalidbotter.getSelectedBots();
            if (bots.length < 1) {
                console.error("No bots selected.");
                return;
            }
            for (let bot of bots) {
                bot.chat(invalidbotter.stringifyArray(args, 0, args.length, " "));
            }
        }
        else {
            invalidbotter.sendUsage("say <Message>");
        }
    }
};
