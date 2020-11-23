"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggle = void 0;
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const Movements = require('mineflayer-pathfinder').Movements;
const { GoalXZ } = require('mineflayer-pathfinder').goals;
exports.Toggle = {
    aliases: [],
    author: "SirLennox",
    command: "goto",
    description: "Go to position or player",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length < 2) {
            invalidbotter.sendUsage("goto <x> <z>");
            return;
        }
        let bots = invalidbotter.getSelectedBots();
        if (bots.length < 1) {
            console.error("No bots selected!");
            return;
        }
        for (let bot of bots) {
            if (!bot.hasPlugin(pathfinder)) {
                bot.loadPlugin(pathfinder);
            }
            const mcData = require('minecraft-data')(bot.version);
            const defaultMove = new Movements(bot, mcData);
            bot["pathfinder"].setMovements(defaultMove);
            bot["pathfinder"].setGoal(new GoalXZ(args[0], args[1]));
            invalidbotter.log("Going to: " + args[0] + "/" + args[1], "SUCCESS", bot);
            invalidbotter.addOnceListenerToBot(bot, "goal_reached", () => {
                invalidbotter.log("Arrived!", "SUCCESS", bot);
            });
        }
    }
};
