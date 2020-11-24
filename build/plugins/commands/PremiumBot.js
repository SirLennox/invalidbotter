"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumBot = void 0;
const fs = __importStar(require("fs"));
exports.PremiumBot = {
    aliases: [
        "premiumbotter",
        "premiumbotserver",
        "pbotter",
        "pbotserver",
        "pbot"
    ],
    author: "SirLennox",
    command: "premiumbot",
    description: "Bot a server with premium accounts",
    version: "1.0",
    onCommand(args, invalidbotter) {
        if (args.length == 2 || args.length == 3) {
            let ipSplit = args[0].split(":");
            let ip;
            let port = 25565;
            if (ipSplit.length == 0) {
                invalidbotter.sendUsage("pbot <ip:port> <accountList> [version]");
                return;
            }
            ip = ipSplit[0];
            if (ipSplit.length == 2) {
                port = parseInt(ipSplit[1]);
            }
            if (ip && port) {
                let version = false;
                if (args.length == 3) {
                    version = args[2];
                }
                let accountList = [];
                try {
                    accountList = fs.readFileSync(args[1]).toString().split('\n');
                }
                catch (e) {
                    console.error("Cannot read file!");
                    return;
                }
                for (let acc = 0; acc < accountList.length; acc++) {
                    if (!accountList[acc] || accountList[acc] == "" || accountList[acc] == "\n") {
                        accountList.splice(acc, 1);
                    }
                }
                console.log("Joining server... (" + accountList.length + " accounts)");
                setTimeout(() => {
                    for (let acc of accountList) {
                        if (acc && acc != "" && acc != "\n") {
                            invalidbotter.addBotWithDelay({
                                username: acc.split(":")[0],
                                password: acc.split(":").slice(1).join(":"),
                                host: ip,
                                port: port,
                                version: version
                            }, true);
                        }
                    }
                }, 100);
            }
            else {
                invalidbotter.sendUsage("pbot <ip:port> <accountList> [version]");
            }
        }
        else {
            invalidbotter.sendUsage("pbot <ip:port> <accountList> [version]");
        }
    }
};
