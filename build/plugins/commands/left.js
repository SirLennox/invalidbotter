"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Left = void 0;
exports.Left = {
    aliases: [],
    author: "SirLennox",
    command: "left",
    description: "Walk left",
    version: "1.0",
    onCommand(args, invalidbotter) {
        let bots = invalidbotter.getSelectedBots();
        if (bots.length < 1) {
            console.log("No bots selected!", "ERROR");
            return;
        }
        let moving = bots[0].controlState.right;
        for (let bot of bots) {
            bot.controlState.right = !moving;
        }
        if (moving) {
            invalidbotter.log("Stopped moving right!", "SUCCESS");
        }
        else {
            invalidbotter.log("Started moving right!", "SUCCESS");
        }
    }
};
