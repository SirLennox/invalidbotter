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
                module.onEnable(invalidbotter);
                module.loop = setInterval(() => {
                    module.onUpdate(invalidbotter);
                }, 1000 / module.loopInterval);

            }else {
                invalidbotter.log("{#FF0000-fg}Disabled{/} {bold}" + module.name + "{/bold}", "MODULE");
                module.onDisable(invalidbotter);
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