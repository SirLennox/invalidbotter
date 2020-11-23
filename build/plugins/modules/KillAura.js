"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KillAura = void 0;
exports.KillAura = {
    author: "SirLennox",
    description: "Attack everyone in your near",
    loop: undefined,
    loopInterval: 1000 / 10,
    name: "KillAura",
    toggled: false,
    version: "",
    onBotKick(bot, botter, reason, loggedIn) {
    },
    onBotSpawn(bot, botter) {
    },
    onDisable(botter) {
    },
    onEnable(botter) {
    },
    onUpdate(botter) {
        for (let bot of botter.getBotsOnServer()) {
            for (let bot of botter.getBotsOnServer()) {
                let nearest = botter.getNearestPlayer(bot);
                if (nearest) {
                    if (nearest.position.distanceTo(bot.entity.position) <= 3.5) {
                        // bot.lookAt(nearest.position.offset(0, 1, 0));
                        bot.attack(nearest);
                    }
                }
            }
        }
    }
};
