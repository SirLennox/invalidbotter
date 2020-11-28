import {Bot} from "mineflayer";
import Module from "../../Module";
import InvalidBotter from "../../invalidbotter";
import Command from "../../Command";
import {plugin} from "mineflayer-pvp";
const { GoalXZ } = require('mineflayer-pathfinder').goals;
const pathfinder = require('mineflayer-pathfinder').pathfinder;

const mineflayerPvP = require("mineflayer-pvp");

export const Attack: Command = {
    aliases: [
    ],
    author: "SirLennox",
    command: "attack",
    description: "Attack a player by name",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
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
            let player = args[0];
            if (bot.players[player].username.toUpperCase() === args[0].toUpperCase()) {
                if (!bot.hasPlugin(pathfinder)) {
                    bot.loadPlugin(pathfinder);
                }
                if (!bot.hasPlugin(mineflayerPvP)) {
                    bot.loadPlugin(plugin);
                }
                bot["pvp"].attack(bot.players[player].entity);
                invalidbotter.log("Started attacking!", "SUCCESS", bot);
            } else {
            invalidbotter.log("Player not found!", "ERROR", bot);
        }
    }
    }

}
