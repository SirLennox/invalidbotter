"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprint = void 0;
exports.Sprint = {
    aliases: [],
    author: "SirLennox",
    command: "sprint",
    description: "sprint",
    version: "1.0",
    onCommand(args, invalidbotter) {
        let bots = invalidbotter.getSelectedBots();
        if (bots.length < 1) {
            console.log("No bots selected!", "ERROR");
            return;
        }
        let moving = bots[0].controlState.sprint;
        for (let bot of bots) {
            bot.controlState.sprint = !moving;
        }
        if (moving) {
            invalidbotter.log("Stopped sprinting!", "SUCCESS");
        }
        else {
            invalidbotter.log("Started sprinting!", "SUCCESS");
        }
    }
};
