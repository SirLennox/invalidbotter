"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dance = void 0;
exports.Dance = {
    onBotSpawn(bot, botter) {
    },
    author: "SirLennox",
    description: "Start/Stop dragging bots",
    loop: undefined,
    loopInterval: 100000,
    name: "DragBots",
    toggled: false,
    version: "1.0",
    onDisable(botter) {
        botter.enableDrag = false;
        botter.refreshBotBoxes();
    },
    onEnable(botter) {
        botter.enableDrag = true;
        botter.refreshBotBoxes();
    },
    onUpdate(botter) {
    },
    onBotKick(bot, botter, reason, loggedIn) {
    }
};
