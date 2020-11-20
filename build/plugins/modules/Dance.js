"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dance = void 0;
exports.Dance = {
    onBotSpawn(bot, botter) {
    },
    author: "SirLennox",
    description: "Dance",
    loop: undefined,
    loopInterval: 20,
    name: "Dance",
    toggled: false,
    version: "1.0",
    onDisable(botter) {
        for (let bot of botter.getBotsOnServer()) {
            bot.controlState.sneak = false;
            bot.controlState.jump = false;
        }
    },
    onEnable(botter) {
    },
    onUpdate(botter) {
        for (let bot of botter.getBotsOnServer()) {
            bot.controlState.sneak = !bot.controlState.sneak;
            bot.controlState.jump = true;
        }
    },
    onBotKick(bot, botter, reason, loggedIn) {
    }
};
