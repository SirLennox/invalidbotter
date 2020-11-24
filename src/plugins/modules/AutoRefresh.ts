import Module from "../../Module";
import InvalidBotter from "../../invalidbotter";
import {Bot} from "mineflayer";
import fs from "fs";
import * as path from "path";
let commandWatch = undefined;
let moduleWatch = undefined;
let themeWatch = undefined;

export const AutoRefresh: Module = {
    onBotSpawn(bot: Bot, botter: InvalidBotter): void {},
    author: "SirLennox",
    description: "Auto-Refresh plugins, commands & themes",
    loop: undefined,
    loopInterval: -1,
    name: "AutoRefresh",
    toggled: true,
    version: "1.0",
    onDisable(botter: InvalidBotter): void {
        fs.unwatchFile(path.join(__dirname, "../commands/"), commandWatch);
        fs.unwatchFile(__dirname, moduleWatch);
    },
    onEnable(botter: InvalidBotter): void {
        commandWatch = fs.watch(path.join(__dirname, "../commands/"), (event, filename) => {
            botter.commandLoader.refreshCommands();
        })
        moduleWatch = fs.watch(__dirname, (event, filename) => {
            botter.moduleLoader.reloadModules();
        })
    },
    onUpdate(botter: InvalidBotter): void {
    },
    onBotKick(bot: Bot, botter: InvalidBotter, reason: string, loggedIn: boolean) {
    }

};
