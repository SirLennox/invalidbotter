import Module from "../../Module";
import {Bot} from "mineflayer";
import InvalidBotter from "../../invalidbotter";
import fs from "fs";

export const ChatHandler: Module = {
    onBotSpawn(bot: Bot, botter: InvalidBotter): void {
        botter.addListenerToBot(bot, "message", (message, type) => {
            if(type !== "game_info") {
                botter.log(message/*.toAnsi({})*/, "CHAT", bot);
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
    onDisable(botter: InvalidBotter): void {
        for(let bot of botter.getBotsOnServer()) {
            botter.removeListenersFromBot(bot, "message", "CHAT_HANDLER");
        }
    },
    onEnable(botter: InvalidBotter): void {
        for(let bot of botter.getBotsOnServer()) {
            botter.addListenerToBot(bot, "message", (message, type) => {
                if(type !== "game_info") {
                    if(!botter.getSelectedBots().includes(bot)) {
                        return;
                    }
                    botter.log(message/*.toAnsi()*/, "CHAT", bot);
                }
            }, "CHAT_HANDLER");
        }
    },
    onUpdate(botter: InvalidBotter): void {
    },
    onBotKick(bot: Bot, botter: InvalidBotter, reason: string, loggedIn: boolean) {
    }

};