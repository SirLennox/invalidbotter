"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KillAura = void 0;
let spamText = "InvalidBotter | by SirLennox | github,com\\SirLennox\\invalidbotter %random%";
exports.KillAura = {
    author: "SirLennox",
    description: "Spam a message",
    loop: undefined,
    loopInterval: 2000,
    name: "Spammer",
    toggled: false,
    version: "",
    onBotKick(bot, botter, reason, loggedIn) {
    },
    onBotSpawn(bot, botter) {
    },
    onDisable(botter) {
    },
    onEnable(botter) {
    },
    onUpdate(botter) {
        for (let bot of botter.getBotsOnServer()) {
            bot.chat(spamText.replace("%random%", require("crypto").randomBytes(4).toString("hex")));
        }
    }
};
