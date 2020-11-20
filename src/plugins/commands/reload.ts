import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";

export const Reload: Command = {
    aliases: [
        "rl"
    ],
    author: "SirLennox",
    command: "reload",
    description: "Reload everything",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        console.log("Reloading commands / modules and rerendering screen...");
        invalidbotter.commandLoader.refreshCommands();
        invalidbotter.moduleLoader.reloadModules();
        invalidbotter.gui.renderScreen();
        invalidbotter.log("Successfully reloaded all commands / modules and rerendered screen!", "SUCCESS");

    }

}