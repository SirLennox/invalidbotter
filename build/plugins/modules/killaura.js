"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KillAura = void 0;
exports.KillAura = {
    author: "SirLennox",
    description: "Attack everyone in your near",
    loop: undefined,
    loopsPerSecond: 10,
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
            for (let entity in bot.entities) {
                if (bot.entities[entity] !== bot.entity) {
                    if (bot.entities[entity].position.distanceTo(bot.entity.position) <= 3.5) {
                        bot.lookAt(bot.entities[entity].position.offset(0, 1, 0));
                        bot.attack(bot.entities[entity]);
                    }
                }
            }
        }
    }
};
