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
            for (let bot of invalidbotter.getSelectedBots()) {
                bot.chat(invalidbotter.stringifyArray(args, 0, args.length, " "));
            }
        }
        else {
            invalidbotter.sendUsage("say <Message>");
        }
    }
};
