import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";

export const Bots: Command = {
    aliases: [
    ],
    author: "SirLennox",
    command: "bots",
    description: "Show all bots",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
            invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Bots{/}]-----------")
            for (let bot of invalidbotter.bots) {
                invalidbotter.writeInChatBox("{#00FF1C-fg}" + bot.bot._client.username + "{/} - {#0067F9-fg}" + bot.ip + ":" + bot.port + "{/}");
            }
            invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Bots{/}]-----------")
        }

}