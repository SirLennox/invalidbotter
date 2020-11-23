"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Right = void 0;
exports.Right = {
    aliases: [],
    author: "SirLennox",
    command: "right",
    description: "Walk right",
    version: "1.0",
    onCommand(args, invalidbotter) {
        let bots = invalidbotter.getSelectedBots();
        if (bots.length < 1) {
            console.log("No bots selected!", "ERROR");
            return;
        }
        let moving = bots[0].controlState.forward;
        for (let bot of bots) {
            bot.controlState.left = !moving;
        }
        if (moving) {
            invalidbotter.log("Stopped moving right!", "SUCCESS");
        }
        else {
            invalidbotter.log("Started moving right!", "SUCCESS");
        }
    }
};
