"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reload = void 0;
exports.Reload = {
    aliases: [
        "rl"
    ],
    author: "SirLennox",
    command: "reload",
    description: "Reload everything",
    version: "1.0",
    onCommand(args, invalidbotter) {
        console.log("Reloading commands / modules and rerendering screen...");
        invalidbotter.commandLoader.refreshCommands();
        invalidbotter.moduleLoader.reloadModules();
        invalidbotter.gui.renderScreen();
        invalidbotter.log("Successfully reloaded all commands / modules and rerendered screen!", "SUCCESS");
    }
};
