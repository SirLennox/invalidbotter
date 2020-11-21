"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHandler = void 0;
exports.ChatHandler = {
    onBotSpawn(bot, botter) {
        botter.addListenerToBot(bot, "message", (message, type) => {
            if (type !== "game_info") {
                botter.log(message /*.toAnsi({})*/, "CHAT", bot);
            }
        }, "CHAT_HANDLER");
    },
    author: "SirLennox",
    description: "Post chat messages in console",
    loop: undefined,
    loopInterval: 20,
    name: "ChatHandler",
    toggled: true,
    version: "1.0",
    onDisable(botter) {
        for (let bot of botter.getBotsOnServer()) {
            botter.removeListenersFromBot(bot, "message", "CHAT_HANDLER");
        }
    },
    onEnable(botter) {
        for (let bot of botter.getBotsOnServer()) {
            botter.addListenerToBot(bot, "message", (message, type) => {
                if (type !== "game_info") {
                    if (!botter.getSelectedBots().includes(bot)) {
                        return;
                    }
                    botter.log(message /*.toAnsi()*/, "CHAT", bot);
                }
            }, "CHAT_HANDLER");
        }
    },
    onUpdate(botter) {
    },
    onBotKick(bot, botter, reason, loggedIn) {
    }
};
