import {Bot} from "mineflayer";
import Module from "../../Module";
import InvalidBotter from "../../invalidbotter";

let spamText = "InvalidBotter | by SirLennox | github,com\\SirLennox\\invalidbotter %random%";

export const KillAura: Module = {
    author: "SirLennox",
    description: "Spam a message",
    loop: undefined,
    loopInterval: 2000,
    name: "Spammer",
    toggled: false,
    version: "",
    onBotKick(bot: Bot, botter: InvalidBotter, reason: string, loggedIn: boolean): void {
    },
    onBotSpawn(bot: Bot, botter: InvalidBotter): void {
    },
    onDisable(botter: InvalidBotter): void {
    },
    onEnable(botter: InvalidBotter): void {
    },
    onUpdate(botter: InvalidBotter): void {
        for(let bot of botter.getBotsOnServer()) {
            bot.chat(spamText.replace("%random%", require("crypto").randomBytes(4).toString("hex")));
        }
    }

}