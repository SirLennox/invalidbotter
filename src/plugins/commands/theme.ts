import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import Module from "../../Module";
import {clearInterval} from "timers";
import fs from "fs";

export const Theme: Command = {
    aliases: [
    ],
    author: "SirLennox",
    command: "theme",
    description: "Select a theme",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        let files: string[] = fs.readdirSync("./themes");
        let file = undefined;
        if(files.includes(args[0])) {
            file = args[0];
        }else if(files.includes(args[0] + ".json")) {
            file = args[0] + ".json";
        }

        if(!file) {
            console.error("Theme not found! Please check your spelling and capitalization.");
            return;
        }

        invalidbotter.themeManager.selectTheme("./themes/" + file);
        invalidbotter.log("Selected theme: " + file, "SUCCESS");


    }

}