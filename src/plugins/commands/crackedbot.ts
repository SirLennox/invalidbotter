import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";

export const CrackedBot: Command = {
    aliases: [
        "crackedbotter",
        "crackedbotserver",
        "cbotter",
        "cbotserver",
        "cbot"
    ],
    author: "SirLennox",
    command: "crackedbot",
    description: "Bot a server with cracked accounts",
    version: "1.0",
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length == 2 || args.length == 3) {
            let ipSplit = args[0].split(":");

            let ip: string;
            let port: number = 25565;

            if(ipSplit.length == 0) {
                invalidbotter.sendUsage("cbot <ip:port> <botCount> [version]");
                return;
            }
            ip = ipSplit[0];
            if(ipSplit.length == 2) {
                port = parseInt(ipSplit[1]);
            }
            if(ip && port) {
                let botCount = undefined;
                let version: any = false;

                if(args.length == 3) {
                    version = args[2];
                }

                botCount = parseInt(args[1]);
                if(!botCount) {
                    console.error("BotCount needs to be a number!");
                    return;
                }
                console.log("Joining server... (" + botCount + " accounts)");
                setTimeout(() => {
                    for(let i = 0; i < botCount; i++) {
                        invalidbotter.addBotWithDelay({
                            username: require("crypto").randomBytes(8).toString("hex"),
                            host: ip,
                            port: port,
                            version: version
                        }, true);
                    }
                }, 100);

            }else {
                invalidbotter.sendUsage("cbot <ip:port> <botCount> [version]");
            }
        }else {
            invalidbotter.sendUsage("cbot <ip:port> <botCount> [version]");
        }
    }

}