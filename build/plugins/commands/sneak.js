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
        let bots = invalidbotter.getSelectedBots();
        if (bots.length < 1) {
            console.log("No bots selected!", "ERROR");
            return;
        }
        let moving = bots[0].controlState.sneak;
        for (let bot of bots) {
            bot.controlState.sneak = !moving;
        }
        if (moving) {
            invalidbotter.log("Stopped sneaking!", "SUCCESS");
        }
        else {
            invalidbotter.log("Started sneaking!", "SUCCESS");
        }
    }
};
