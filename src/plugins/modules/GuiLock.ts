import {Bot} from "mineflayer";
import Module from "../../Module";
import InvalidBotter from "../../invalidbotter";

export const GuiLock: Module = {
    author: "SirLennox",
    description: "Disable / Enable GUI drag",
    loop: undefined,
    loopInterval: -1,
    name: "GuiLock",
    toggled: false,
    version: "",
    onBotKick(bot: Bot, botter: InvalidBotter, reason: string, loggedIn: boolean): void {
    },
    onBotSpawn(bot: Bot, botter: InvalidBotter): void {
    },
    onDisable(botter: InvalidBotter): void {
        botter.gui.chatBox.draggable = true;
        botter.gui.playerList.draggable = true;
        botter.gui.inputBox.draggable = true;
    },
    onEnable(botter: InvalidBotter): void {
        botter.gui.chatBox.draggable = false;
        botter.gui.playerList.draggable = false;
        botter.gui.inputBox.draggable = false;
    },
    onUpdate(botter: InvalidBotter): void {
    }

}
