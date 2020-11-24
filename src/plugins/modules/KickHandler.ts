import Module from "../../Module";
import InvalidBotter from "../../invalidbotter";
import {Bot} from "mineflayer";

export const KickHandler: Module = {
    onBotSpawn(bot: Bot, botter: InvalidBotter): void {},
    author: "SirLennox",
    description: "A kick handler to notify if you got kicked from a server",
    loop: undefined,
    loopInterval: -1,
    name: "KickHandler",
    toggled: true,
    version: "1.0",
    onDisable(botter: InvalidBotter): void {

    },
    onEnable(botter: InvalidBotter): void {

    },
    onUpdate(botter: InvalidBotter): void {
    },
    onBotKick(bot: Bot, botter: InvalidBotter, reason: string, loggedIn: boolean) {
        botter.log(bot._client.username + " got kicked for: {bold} " + reason + "{/bold}", "KICK", bot);
        botter.removeBot(bot);
    }

};
