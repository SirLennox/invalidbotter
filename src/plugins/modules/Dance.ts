import Module from "../../Module";
import {Bot} from "mineflayer";
import InvalidBotter from "../../invalidbotter";
import fs from "fs";

export const Dance: Module = {
    onBotSpawn(bot: Bot, botter: InvalidBotter): void {

    },
    author: "SirLennox",
    description: "Dance",
    loop: undefined,
    loopInterval: 500,
    name: "Dance",
    toggled: false,
    version: "1.0",
    onDisable(botter: InvalidBotter): void {
        for(let bot of botter.getBotsOnServer()) {
            bot.controlState.sneak = false;
            bot.controlState.jump = false;
        }
    },
    onEnable(botter: InvalidBotter): void {
    },
    onUpdate(botter: InvalidBotter): void {
        for(let bot of botter.getBotsOnServer()) {
            bot.controlState.sneak = !bot.controlState.sneak;
            bot.controlState.jump = true;
        }
    },
    onBotKick(bot: Bot, botter: InvalidBotter, reason: string, loggedIn: boolean) {
    }

};