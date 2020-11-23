"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backward = void 0;
const mineflayer_pvp_1 = require("mineflayer-pvp");
const { GoalXZ } = require('mineflayer-pathfinder').goals;
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const mineflayerPvP = require("mineflayer-pvp");
exports.Backward = {
    aliases: [],
    author: "SirLennox",
    command: "attack",
    description: "Attack a player by name",
    version: "1.0",
    onCommand(args, invalidbotter) {
        let bots = invalidbotter.getSelectedBots();
        if (args.length !== 1) {
            invalidbotter.sendUsage("attack <Name>");
            return;
        }
        if (bots.length < 1) {
            console.log("No bots selected!", "ERROR");
            return;
        }
        for (let bot of bots) {
            let found = false;
            for (let player in bot.players) {
                if (bot.players[player].username.toUpperCase() === args[0].toUpperCase()) {
                    found = true;
                    if (!bot.hasPlugin(pathfinder)) {
                        bot.loadPlugin(pathfinder);
                    }
                    if (!bot.hasPlugin(mineflayerPvP)) {
                        bot.loadPlugin(mineflayer_pvp_1.plugin);
                    }
                    bot["pvp"].attack(bot.players[player]);
                    break;
                }
            }
            if (!found) {
                invalidbotter.log("Player not found!", "ERROR", bot);
            }
            else {
                invalidbotter.log("Started attacking!", "SUCCESS", bot);
            }
        }
    }
};
