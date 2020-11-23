import {Bot} from "mineflayer";
import Module from "../../Module";
import InvalidBotter from "../../invalidbotter";
import {plugin} from "mineflayer-pvp";
const mineflayerPvP = require("mineflayer-pvp");
const { GoalXZ } = require('mineflayer-pathfinder').goals;
const pathfinder = require('mineflayer-pathfinder').pathfinder;

export const FightBot: Module = {
    author: "SirLennox",
    description: "Attack everyone with AI",
    loop: undefined,
    loopInterval: 1000 / 10,
    name: "FightBot",
    toggled: false,
    version: "",
    onBotKick(bot: Bot, botter: InvalidBotter, reason: string, loggedIn: boolean): void {
    },
    onBotSpawn(bot: Bot, botter: InvalidBotter): void {
    },
    onDisable(botter: InvalidBotter): void {
    },
    onEnable(botter: InvalidBotter): void {
    },
    onUpdate(botter: InvalidBotter): void {
        for(let bot of botter.getBotsOnServer()) {
                    let nearest = botter.getNearestPlayer(bot);
                    if(nearest) {
                        if (!bot.hasPlugin(pathfinder)) {
                            bot.loadPlugin(pathfinder);
                        }
                        if(!bot.hasPlugin(mineflayerPvP)) {
                            bot.loadPlugin(plugin);
                        }
                        bot["pvp"].attack(nearest);
                    }
        }
    }

}

