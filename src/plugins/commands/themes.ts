import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import Module from "../../Module";
import {clearInterval} from "timers";
import fs from "fs";
import * as path from "path";

export const Themes: Command = {
    aliases: [
    ],
    author: "SirLennox",
    command: "themes",
    description: "List all themes",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        let files: string[] = fs.readdirSync(path.join(__dirname, "..", "..", "themes"));
        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Help-Page{/}]-----------")
        for(let file of files) {
            invalidbotter.writeInChatBox(file.replace(".json", ""));
        }
        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Help-Page{/}]-----------")
    }

}
