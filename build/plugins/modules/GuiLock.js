"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuiLock = void 0;
exports.GuiLock = {
    author: "SirLennox",
    description: "Disable / Enable GUI drag",
    loop: undefined,
    loopInterval: -1,
    name: "GuiLock",
    toggled: false,
    version: "",
    onBotKick(bot, botter, reason, loggedIn) {
    },
    onBotSpawn(bot, botter) {
    },
    onDisable(botter) {
        botter.gui.chatBox.draggable = true;
        botter.gui.playerList.draggable = true;
        botter.gui.inputBox.draggable = true;
    },
    onEnable(botter) {
        botter.gui.chatBox.draggable = false;
        botter.gui.playerList.draggable = false;
        botter.gui.inputBox.draggable = false;
    },
    onUpdate(botter) {
    }
};
