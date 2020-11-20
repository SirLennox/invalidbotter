"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoRefresh = void 0;
const fs_1 = __importDefault(require("fs"));
let commandWatch = undefined;
let moduleWatch = undefined;
let themeWatch = undefined;
exports.AutoRefresh = {
    onBotSpawn(bot, botter) { },
    author: "SirLennox",
    description: "Auto-Refresh plugins, commands & themes",
    loop: undefined,
    loopInterval: 1000000,
    name: "AutoRefresh",
    toggled: true,
    version: "1.0",
    onDisable(botter) {
        fs_1.default.unwatchFile("./build/plugins/commands/", commandWatch);
        fs_1.default.unwatchFile("./build/plugins/modules/", moduleWatch);
    },
    onEnable(botter) {
        commandWatch = fs_1.default.watch("./build/plugins/commands/", (event, filename) => {
            botter.commandLoader.refreshCommands();
        });
        moduleWatch = fs_1.default.watch("./build/plugins/modules/", (event, filename) => {
            botter.moduleLoader.reloadModules();
        });
    },
    onUpdate(botter) {
    },
    onBotKick(bot, botter, reason, loggedIn) {
    }
};
