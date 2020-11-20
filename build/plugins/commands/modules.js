"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modules = void 0;
exports.Modules = {
    aliases: [
        "mods"
    ],
    author: "SirLennox",
    command: "modules",
    description: "Show all modules",
    version: "1.0",
    onCommand(args, invalidbotter) {
        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Modules{/}]-----------");
        for (let module of invalidbotter.moduleLoader.modules) {
            invalidbotter.writeInChatBox("{#00FF1C-fg}" + module.name + "{/} - {#0067F9-fg}" + (module.toggled ? "{#0FFF00-fg}Enabled{/}" : "{#FF0000-fg}Disabled{/}") + "{/}");
        }
        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Modules{/}]-----------");
    }
};
