import {Bot} from "mineflayer";
import Module from "../../Module";
import InvalidBotter from "../../invalidbotter";

export const KillAura: Module = {
    author: "SirLennox",
    description: "Attack everyone in your near",
    loop: undefined,
    loopInterval: 1000 / 10,
    name: "KillAura",
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
            for(let bot of botter.getBotsOnServer()) {
                let nearest = botter.getNearestPlayer(bot);
                if(nearest) {
                    if (nearest.position.distanceTo(bot.entity.position) <= 3.5) {
                       // bot.lookAt(nearest.position.offset(0, 1, 0));
                        bot.attack(nearest);
                    }
                }
            }
        }
    }

}

