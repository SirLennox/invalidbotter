"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KickHandler = void 0;
exports.KickHandler = {
    onBotSpawn(bot, botter) {
        botter.addListenerToBot(bot, "kicked", (reason, loggedIn) => {
            botter.log(bot._client.username + " got kicked for: " + reason, "KICK", bot);
            botter.removeBot(bot);
        });
    },
    author: "SirLennox",
    description: "A kick handler to notify if you got kicked from a server",
    loop: undefined,
    loopInterval: 20,
    name: "KickHandler",
    toggled: true,
    version: "1.0",
    onDisable(botter) {
    },
    onEnable(botter) {
    },
    onUpdate(botter) {
    },
    onBotKick(bot, botter, reason, loggedIn) {
        botter.log(bot._client.username + " got kicked for: {bold} " + reason + "{/bold}", "KICK", bot);
        botter.removeBot(bot);
    }
};
