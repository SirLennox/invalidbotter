"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backward = void 0;
exports.Backward = {
    aliases: [
        "back",
        "bw"
    ],
    author: "SirLennox",
    command: "backward",
    description: "Walk backward",
    version: "1.0",
    onCommand(args, invalidbotter) {
        let bots = invalidbotter.getSelectedBots();
        if (bots.length < 1) {
            console.log("No bots selected!", "ERROR");
            return;
        }
        let moving = bots[0].controlState.back;
        for (let bot of bots) {
            bot.controlState.back = !moving;
        }
        if (moving) {
            invalidbotter.log("Stopped moving backward!", "SUCCESS");
        }
        else {
            invalidbotter.log("Started moving backward!", "SUCCESS");
        }
    }
};
