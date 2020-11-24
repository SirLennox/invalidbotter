const pathfinder = require('mineflayer-pathfinder').pathfinder;
const Movements = require('mineflayer-pathfinder').Movements;
const { GoalFollow } = require('mineflayer-pathfinder').goals;
import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import Module from "../../Module";
import {clearInterval} from "timers";

let follows = [];

export const Follow: Command = {
    aliases: [],
    author: "SirLennox",
    command: "follow",
    description: "Follow a player",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length !== 1) {
            invalidbotter.sendUsage("follow <Player>");
            return;
        }
        let bots = invalidbotter.getSelectedBots();
        if (bots.length < 1) {
            console.error("No bots selected!");
            return;
        }


            for (let bot of bots) {
                let player = args[0];
                if (bot.players[player] && bot.players[player].entity && bot.players[player].entity.position && bot.players[player].username.toUpperCase() === args[0].toUpperCase()) {
                    const mcData = require('minecraft-data')(bot.version);
                    const defaultMove = new Movements(bot, mcData);

                    if (!bot.hasPlugin(pathfinder)) {
                        bot.loadPlugin(pathfinder);
                    }

                    bot["pathfinder"].setMovements(defaultMove);
                    let goal;
                    follows.push(goal = new GoalFollow(bot.players[player].entity, 0));
                    bot["pathfinder"].setGoal(goal);
                    invalidbotter.log("Following: " + args[0], "SUCCESS", bot);
                    invalidbotter.addOnceListenerToBot(bot, "goal_reached", () => {
                        invalidbotter.log("Arrived!", "SUCCESS", bot);
                    });
                    invalidbotter.log("Started going to!", "SUCCESS", bot);
                    break;
                } else {
                    invalidbotter.log("Player not found!", "ERROR", bot);
                }
            }
    }



}


export const ResetFollows: Command = {
    aliases: ["resetfollows", "stopfollow", "stopfollowing"],
    author: "SirLennox",
    command: "resetfollows",
    description: "Reset the follows of all selected bots",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        let bots = invalidbotter.getSelectedBots();
        if(bots.length < 1) {
            console.error("No bots selected!");
            return;
        }
        for(let bot of bots) {
            if(bot.hasPlugin(pathfinder)) {
                bot["pathfinder"].setGoal(undefined);
            }
        }

        invalidbotter.log("Successfully stopped following!", "SUCCESS");
    }



}
