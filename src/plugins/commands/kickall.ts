import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import {Bot} from "mineflayer";

export const Jump: Command = {
    aliases: [
    ],
    author: "SirLennox",
    command: "kickall",
    description: "Kick everyone from a cracked server",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        let bots = invalidbotter.getSelectedBotsAsIBot();
        if(bots.length < 1) {
            console.log("No bots selected!", "ERROR");
            return;
        }
        console.log("Trying to kick everyone");
       for(let bot of bots) {
           for(let player in bot.bot.players) {
               if(!invalidbotter.getBotByName(bot.bot.players[player].username) && !invalidbotter.isOwner(bot.bot.players[player].username)) {
                   invalidbotter.addBotWithDelay({
                       host: bot.ip,
                       port: bot.port,
                       username: bot.bot.players[player].username
                   }, false, (bot2) => {
                       invalidbotter.addOnceListenerToBot(bot2, "spawn", () => {
                           invalidbotter.log("Kicked " + bot2._client.username, "SUCCESS");
                           invalidbotter.removeBot(bot2);
                       });
                   });
               }



           }
       }
    }

}