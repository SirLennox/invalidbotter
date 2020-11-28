"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FightBot = void 0;
const mineflayer_pvp_1 = require("mineflayer-pvp");
const mineflayerPvP = require("mineflayer-pvp");
const { GoalXZ } = require('mineflayer-pathfinder').goals;
const pathfinder = require('mineflayer-pathfinder').pathfinder;
exports.FightBot = {
    author: "SirLennox",
    description: "Attack everyone with AI",
    loop: undefined,
    loopInterval: 1000,
    name: "FightBot",
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
            if (!bot["pvp"] || !bot["pvp"].target) {
                let nearest = botter.getNearestPlayer(bot);
                if (nearest) {
                    if (!bot.hasPlugin(pathfinder)) {
                        bot.loadPlugin(pathfinder);
                    }
                    if (!bot.hasPlugin(mineflayerPvP)) {
                        bot.loadPlugin(mineflayer_pvp_1.plugin);
                    }
                    bot["pvp"].attack(nearest);
                }
            }
        }
    }
};
