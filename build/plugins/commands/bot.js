"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
exports.Bot = {
    aliases: [
        "crackedbotter",
        "crackedbotserver",
        "cbotter",
        "cbotserver"
    ],
    author: "SirLennox",
    command: "crackedbot",
    description: "Bot a server with cracked accounts",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 2 || args.length == 3) {
            let ipSplit = args[0].split(":");
            let ip;
            let port = 25565;
            if (ipSplit.length == 0) {
                invalidbotter.sendUsage("<ip:port> <botCount> [version]");
                return;
            }
            ip = ipSplit[0];
            if (ipSplit.length == 2) {
                port = parseInt(ipSplit[1]);
            }
            if (ip && port) {
                let botCount = undefined;
                let version = false;
                if (args.length == 3) {
                    version = args[2];
                }
                botCount = parseInt(args[1]);
                if (!botCount) {
                    console.error("BotCount need to be a number!");
                    return;
                }
                console.log("Joining server... (" + botCount + " accounts)");
                setTimeout(() => {
                    for (let i = 0; i < botCount; i++) {
                        invalidbotter.addBotWithDelay({
                            username: require("crypto").randomBytes(8).toString("hex"),
                            host: ip,
                            port: port,
                            version: version
                        }, true);
                    }
                }, 100);
            }
            else {
                invalidbotter.sendUsage("<ip:port> <botCount> [version]");
            }
        }
        else {
            invalidbotter.sendUsage("<ip:port> <botCount> [version]");
        }
    }
};
