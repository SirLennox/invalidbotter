"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggle = void 0;
const timers_1 = require("timers");
exports.Toggle = {
    aliases: [
        "t"
    ],
    author: "SirLennox",
    command: "toggle",
    description: "Toggle a module",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 1) {
            let module = invalidbotter.moduleLoader.loadModule(args[0]);
            if (!module) {
                invalidbotter.log("Module not found!", "ERROR");
                return;
            }
            if (!module.toggled) {
                invalidbotter.log("{#0FFF00-fg}Enabled{/} {bold}" + module.name + "{/bold}", "MODULE");
                module.toggled = true;
                try {
                    module.onEnable(invalidbotter);
                }
                catch (e) {
                    console.error("An unexpected error occurred while enabling " + module.name + ".");
                    console.error(e.message);
                }
                module.loop = setInterval(() => {
                    try {
                        module.onUpdate(invalidbotter);
                    }
                    catch (e) {
                        console.error("An unexpected error occurred while updating " + module.name + ".");
                        console.error(e.message);
                        module.toggled = false;
                        try {
                            module.onDisable(this);
                        }
                        catch (e) {
                            console.error("An unexpected error occurred while disabling " + module.name + ".");
                            console.error(e.message);
                        }
                    }
                }, 1000 / module.loopInterval);
            }
            else {
                invalidbotter.log("{#FF0000-fg}Disabled{/} {bold}" + module.name + "{/bold}", "MODULE");
                try {
                    module.onDisable(invalidbotter);
                }
                catch (e) {
                    console.error("An unexpected error occurred while enabling " + module.name + ".");
                    console.error(e.message);
                }
                if (module.loop) {
                    timers_1.clearInterval(module.loop);
                }
                module.toggled = false;
                module.loop = undefined;
            }
        }
        else {
            invalidbotter.sendUsage("toggle <Module>");
        }
    }
};
