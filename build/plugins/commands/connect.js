"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = void 0;
exports.Connect = {
    aliases: [
        "con",
        "join"
    ],
    author: "SirLennox",
    command: "connect",
    description: "Connect to a server with one account",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 2 || args.length == 3) {
            let ipSplit = args[0].split(":");
            let ip;
            let port = 25565;
            if (ipSplit.length == 0) {
                invalidbotter.sendUsage("<ip:port> <email(:password)> [version]");
                return;
            }
            ip = ipSplit[0];
            if (ipSplit.length == 2) {
                port = parseInt(ipSplit[1]);
            }
            if (ip && port) {
                let email = undefined;
                let pwd = undefined;
                let version = false;
                let part = args[1];
                let splitCredentials = part.split(":");
                if (splitCredentials.length == 0) {
                    invalidbotter.sendUsage("<ip:port> <email(:password)> [version]");
                    return;
                }
                if (args.length == 3) {
                    version = args[2];
                }
                email = splitCredentials[0];
                if (splitCredentials.length == 1) {
                    console.log("Joining server..");
                    invalidbotter.addBotWithDelay({
                        username: email,
                        host: ip,
                        port: port,
                        version: version
                    }, true);
                }
                else {
                    pwd = splitCredentials.slice(1).join(":");
                    console.log("Joining server...");
                    invalidbotter.addBotWithDelay({
                        username: email,
                        password: pwd,
                        host: ip,
                        port: port,
                        version: version
                    }, true);
                }
            }
            else {
                invalidbotter.sendUsage("<ip:port> <email(:password)> [version]");
            }
        }
        else {
            invalidbotter.sendUsage("<ip:port> <email(:password)> [version]");
        }
    }
};
