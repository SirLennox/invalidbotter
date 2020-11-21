import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import Module from "../../Module";
import {clearInterval} from "timers";

export const Toggle: Command = {
    aliases: [
        "t"
    ],
    author: "SirLennox",
    command: "toggle",
    description: "Toggle a module",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length == 1) {
            let module: Module = invalidbotter.moduleLoader.loadModule(args[0]);
            if(!module) {
                invalidbotter.log("Module not found!", "ERROR");
                return;
            }
            if(!module.toggled) {
                invalidbotter.log("{#0FFF00-fg}Enabled{/} {bold}" + module.name + "{/bold}", "MODULE");
                module.toggled = true;
                try {
                module.onEnable(invalidbotter);
                } catch(e) {
                    console.error("An unexpected error occurred while enabling " + module.name + ".");
                    console.error(e.message);
                }
                module.loop = setInterval(() => {
                    try {
                    module.onUpdate(invalidbotter);
                    } catch(e) {
                        console.error("An unexpected error occurred while updating " + module.name + ".");
                        console.error(e.message);
                        module.toggled = false;
                        try {
                            module.onDisable(this);
                        } catch(e) {
                            console.error("An unexpected error occurred while disabling " + module.name + ".");
                            console.error(e.message);
                        }
                    }
                }, 1000 / module.loopInterval);

            }else {
                invalidbotter.log("{#FF0000-fg}Disabled{/} {bold}" + module.name + "{/bold}", "MODULE");
               try {
                module.onDisable(invalidbotter);
               } catch(e) {
                   console.error("An unexpected error occurred while enabling " + module.name + ".");
                   console.error(e.message);
               }
                if(module.loop) {
                    clearInterval(module.loop);
                }
                module.toggled = false;
                module.loop = undefined;
            }
        }else {
            invalidbotter.sendUsage("toggle <Module>");
        }
    }

}