import Command from "../../Command";
import InvalidBotter from "../../invalidbotter";
import * as fs from "fs";

export const PremiumBot: Command = {
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
    onCommand(args: string[], invalidbotter: InvalidBotter): void {
        if(args.length == 2 || args.length == 3) {
            let ipSplit = args[0].split(":");

            let ip: string;
            let port: number = 25565;

            if(ipSplit.length == 0) {
                invalidbotter.sendUsage("<ip:port> <accountList> [version]");
                return;
            }
            ip = ipSplit[0];
            if(ipSplit.length == 2) {
                port = parseInt(ipSplit[1]);
            }
            if(ip && port) {
                let version: any = false;

                if(args.length == 3) {
                    version = args[2];
                }

                let accountList: string[] = [];

                try {
                    accountList = fs.readFileSync(args[1]).toString().split('\n');
                } catch (e) {
                    console.error("Cannot read file!");
                    return;
                }

                for(let acc = 0; acc < accountList.length; acc++) {
                    if(!accountList[acc] || accountList[acc] == "" || accountList[acc] == "\n") {
                        accountList.splice(acc, 1);
                    }
                }

                console.log("Joining server... (" + accountList.length + " accounts)");
                setTimeout(() => {
                    for(let acc of accountList) {
                        if(acc && acc != "" && acc != "\n") {
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

            }else {
                invalidbotter.sendUsage("<ip:port> <accountList> [version]");
            }
        }else {
            invalidbotter.sendUsage("<ip:port> <accountList> [version]");
        }
    }

}