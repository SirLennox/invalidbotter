import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import {Bot} from "mineflayer";

export const Backward: Command = {
    aliases: [],
    author: "SirLennox",
    command: "clearchat",
    description: "Clear the chat",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        invalidbotter.gui.chatBox.setContent("");
    }

}