import Module from "../../Module";
import InvalidBotter from "../../invalidbotter";
import {Bot} from "mineflayer";
import fs from "fs";

let commandWatch = undefined;
let moduleWatch = undefined;
let themeWatch = undefined;

export const AutoRefresh: Module = {
    onBotSpawn(bot: Bot, botter: InvalidBotter): void {},
    author: "SirLennox",
    description: "Auto-Refresh plugins, commands & themes",
    loop: undefined,
    loopInterval: 20,
    name: "AutoRefresh",
    toggled: true,
    version: "1.0",
    onDisable(botter: InvalidBotter): void {
        fs.unwatchFile("./build/plugins/commands/", commandWatch);
        fs.unwatchFile("./build/plugins/modules/", moduleWatch);
    },
    onEnable(botter: InvalidBotter): void {
        commandWatch = fs.watch("./build/plugins/commands/", (event, filename) => {
            botter.commandLoader.refreshCommands();
        })
        moduleWatch = fs.watch("./build/plugins/modules/", (event, filename) => {
            botter.moduleLoader.reloadModules();
        })
    },
    onUpdate(botter: InvalidBotter): void {
    },
    onBotKick(bot: Bot, botter: InvalidBotter, reason: string, loggedIn: boolean) {
    }

};