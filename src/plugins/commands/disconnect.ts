import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";

export const Disconnect: Command = {
    aliases: [
        "dc",
        "leave",
        "removebot",
        "delbot",
        "rmbot",
        "deletebot"
    ],
    author: "SirLennox",
    command: "disconnect",
    description: "Disconnect from a server",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length == 1) {
            if(args[0].toUpperCase() === "*") {
                for(let bot of invalidbotter.getBotsOnServer()) {
                    invalidbotter.removeBot(bot);
                }
                invalidbotter.log("Every bot got removed.", "SUCCESS");
            }else {
                let bot = invalidbotter.getBotByName(args[0]);
                if(!bot) {
                    invalidbotter.log("Bot not found!", "ERROR");
		    return;
                }
                invalidbotter.removeBot(bot);
                invalidbotter.log("Successfully removed bot.", "SUCCESS");
            }
        }else {
            invalidbotter.sendUsage("disconnect <Name/*>");
        }
    }

}
