import * as mineflayer from "mineflayer";
import ConfigReader from "./configreader";
import ModuleLoader from "./moduleloader";
import CommandLoader from "./commandloader";
import Gui from "./gui/gui";
import {Bot, BotOptions} from "mineflayer";
import {Widgets} from "blessed";
import Log = Widgets.Log;
import {type} from "os";
import ThemeManager from "./ThemeManager";
import * as blessed from "blessed";
import * as path from "path";
import IBot from "./IBot";

let pkg = require("../package.json")

export default class InvalidBotter {


    public config: any;
    public messageColors: any;
    public configReader: ConfigReader;
    public commandLoader: CommandLoader;
    public moduleLoader: ModuleLoader
    public gui: Gui;
    public bots: IBot[] = [];
    public theme: any;
    public themeManager: ThemeManager;
    //TODO ADD THEMES WITH COLORS ETC

    public constructor() {
        this.themeManager = new ThemeManager(this);
        this.configReader = new ConfigReader();
        this.config = this.configReader.readConfigFile(path.join(__dirname, "/settings.json"));
        this.messageColors = this.configReader.readConfigFile(path.join(__dirname, "/defaultMessageColors.json"));

        this.gui = new Gui(this);
        this.commandLoader = new CommandLoader(this, path.join(__dirname, "/plugins/commands/"));
        this.moduleLoader = new ModuleLoader(this, path.join(__dirname, "/plugins/modules/"));
    }


    public start(): void {

        this.gui.createGui();
        if(this.gui.chatBox.width >= "               _____                 _ _     _ ____        _   _            ".length) {
            this.writeInChatBox("{#B400FF-fg}               _____                 _ _     _ ____        _   _            \n" +
                "              |_   _|               | (_)   | |  _ \\      | | | |           \n" +
                "                | |  _ ____   ____ _| |_  __| | |_) | ___ | |_| |_ ___ _ __ \n" +
                "                | | | '_ \\ \\ / / _` | | |/ _` |  _ < / _ \\| __| __/ _ \\ '__|\n" +
                "               _| |_| | | \\ V / (_| | | | (_| | |_) | (_) | |_| ||  __/ |   \n" +
                "              |_____|_| |_|\\_/ \\__,_|_|_|\\__,_|____/ \\___/ \\__|\\__\\___|_|   \n" +
                "               by {bold}SirLennox{/bold}                              {/}{#FFFE00-fg}v" + pkg.version + "{/}");
            this.writeInChatBox("\n\n");
        }else {
            this.writeInChatBox("{#B400FF-fg}InvalidBotter  {/}{#FFFE00-fg}v" + pkg.version + "{/} {#0FFF00-fg}by {bold}SirLennox{/bold}{/}");
            this.writeInChatBox("\n\n");
        }
        console.log = (input) => this.log(input, "INFO");
        console.info = (input) => this.log(input, "INFO");
        console.error = (input) => this.log(input, "ERROR");
        console.warn = (input) => this.log(input, "WARNING");
       // this.themeManager.selectTheme("./themes/dark.json");
        this.commandLoader.refreshCommands();
        this.moduleLoader.reloadModules();
        for(let module of this.moduleLoader.modules) {
            if(module.toggled) {
             try {
                module.onEnable(this);
            } catch(e) {
                console.error("An unexpected error occurred while enabling " + module.name + ".");
                console.error(e.message);
            }
                module.loop = setInterval(() => {
                 try {
                    module.onUpdate(this);
                } catch(e) {
                    console.error("An unexpected error occurred while updating " + module.name + ".");
                    console.error(e.message);
                    module.toggled = false;
                    try {
                        module.onDisable(this);
                    } catch(e) {
                        console.error("An unexpected error occurred while disabling " + module.name + ".");
                        console.error(e.message);
                    }
                 }
                }, 1000 / module.loopInterval);
            }
        }
     //   this.themeManager.selectTheme("./src/themes/dark.json");
    }

    public onCommand(command: string) {
        let splitCommand: string[] = command.split(" ");
        if(splitCommand.length >= 1) {
            let commandStr : string = splitCommand[0];
            let args: string[] = this.cutArray(splitCommand, 1, splitCommand.length);
            let command = this.commandLoader.loadCommand(commandStr);
            if(!command) {
                this.log("Unknown command! Type {bold}'help'{/bold} for help.", "ERROR");
                return;
            }
            try {
                command.onCommand(args, this);
            } catch(e) {
                console.error("An unexpected error occurred while performing this command.");
                console.error(e.message);
            }
        }


    }

    public log(text: string, loglevel: string, bot?: Bot) {
        this.writeInChatBox("[{" + this.getColorOf(loglevel) + "-fg}" + loglevel + "{/}" + (bot ? "/" + bot._client.username : "") + "] " + text)
    }

    public writeInChatBox(text: string) {
        if(!this.gui) return;
        if(!this.gui.chatBox) return;
        this.gui.chatBox.pushLine(text.toString());
        this.gui.chatBox.setScrollPerc(100);
        this.gui.renderScreen();
    }

    public getBotByName(name: string): Bot {
        for(let bot of this.getBotsOnServer()) {
            if(bot._client.username.toUpperCase() === name.toUpperCase()) {
                return bot;
            }
        }
    }





    public getBotJSONObjectByName(name: string): any {
        for(let bot of this.bots) {
            if(bot.bot._client.username.toUpperCase() === name.toUpperCase() && bot.onServer) {
                return bot;
            }
        }
    }

    public getColorOf(loglevel: string) {
        for(let text of this.messageColors.colors) {
            if(text.name.toString().toUpperCase() === loglevel.toUpperCase()) {
                return text.color;
            }
        }
        return "#FFFFFF";
    }

    public botDelayIndex = -1;


    public addBotWithDelay(options: BotOptions, sendMessage?: boolean) {
        if(!sendMessage) {
            sendMessage = false;
        }
        this.botDelayIndex++;
        setTimeout(() => {
            let bot = this.addBot(options);
            if(sendMessage) this.log("Joined server {bold}" + options.host + ":" + options.port + "{/bold} with account: {bold}" + options.username + "{/bold}", "SUCCESS")
            this.botDelayIndex--;
        }, this.getBotDelay())
    }

    public getBotDelay() {
        return this.config.joinDelay + (this.botDelayIndex * this.config.joinDelay);
    }

    public addBot(options: BotOptions) {
        let bot = mineflayer.createBot(options);
        this.bots.push({
            bot: bot,
            listeners: [],
            onServer: false,
            ip: options.host,
            port: options.port,
            selected: false,
            box: undefined
        })

        this.addOnceListenerToBot(bot, "spawn", () => {
            for(let module of this.moduleLoader.modules) {
                if(module.toggled) {
                    try {
                    module.onBotSpawn(bot, this);
                    } catch(e) {
                        console.error("An unexpected error occurred while executing onBotSpawn of " + module.name + ".");
                        console.error(e.message);
                        module.toggled = false;
                        try {
                            module.onDisable(this);
                        } catch(e) {
                            console.error("An unexpected error occurred while disabling " + module.name + ".");
                            console.error(e.message);
                        }
                    }
                }
            }
            for(let b in this.bots) {
                if(this.bots[b].bot === bot) {
                    this.bots[b].onServer = true;
                    break;
                }
            }
            this.refreshBotBoxes();
        });

        this.addOnceListenerToBot(bot, "kicked", (reason, loggedIn) => {
            this.removeBot(bot);
            for(let module of this.moduleLoader.modules) {
                if(module.toggled) {
                    try {
                    module.onBotKick(bot, this, reason, loggedIn);
                    } catch(e) {
                        console.error("An unexpected error occurred while executing onBotKick of " + module.name + ".");
                        console.error(e.message);
                        module.toggled = false;
                        try {
                            module.onDisable(this);
                        } catch(e) {
                            console.error("An unexpected error occurred while disabling " + module.name + ".");
                            console.error(e.message);
                        }
                    }
                }
            }
        })

        return bot;
    }

    public getAllBots() : Bot[] {
        let array: Bot[] = [];
        for(let bot of this.bots) {
            array.push(bot.bot);
        }
        return array;
    }

    public getBotsOnServer() : Bot[] {
        let array: Bot[] = [];
        for(let bot of this.bots) {
            if(bot.onServer) {
                array.push(bot.bot);
            }
        }
        return array;
    }
    public getSelectedBots() : Bot[] {
        let array: Bot[] = [];
        for(let bot of this.bots) {
            if(bot.onServer && bot.selected) {
                array.push(bot.bot);
            }
        }
        return array;
    }

    public addListenerToBot(bot: Bot, listenerType: any, func: Function, key?: string) {
        bot.on(listenerType, func);
        for(let botPart in this.bots) {
            if(this.bots[botPart].bot === bot) {
                this.bots[botPart].listeners.push({name: listenerType, func: func, key: key});
                break;
            }
        }

    }

    public addOnceListenerToBot(bot: Bot, listenerType: any, func: Function, key?: string) {
        bot.once(listenerType, func);
        for(let botPart in this.bots) {
            if(this.bots[botPart].bot === bot) {
                this.bots[botPart].listeners.push({name: listenerType, func: func, key: key});
                break;
            }
        }

    }

    public removeBotBox(bot: Bot) {
        let sliceBox = this.getBotJSONObjectByName(bot._client.username);
        this.removeBotBoxByJSONObj(sliceBox);
    }

    public removeBotBoxByJSONObj(bot: any) {
        this.removeBotBoxByBox(bot.box);
    }



    public removeBotBoxByBox(sliceBox: any) {
        if(!sliceBox) return;
        for(let box = 0; box < this.gui.playerList.children.length; box++) {
            if(this.gui.playerList.children[box] === sliceBox) {
                this.gui.playerList.remove(this.gui.playerList.children[box]);
                //this.gui.playerList.children.slice(box, 1);
                this.gui.renderScreen();
                break;
            }
        }
    }



    public enableDrag = false;
    public refreshBotBoxes() {
        let index = 0;
        this.gui.playerList.children = [];
        for(let bot in this.bots) {
            if(this.bots[bot].onServer) {
                let box = blessed.box({
                    top: index,
                    left: "0%",
                    width: "100%-4",
                    height: 1,
                    style: {
                        fg: this.bots[bot].selected ? this.gui.chatBackground : this.gui.fontColor,
                        bg: !this.bots[bot].selected ? this.gui.chatBackground : this.gui.fontColor
                    },
                    focusable: false,
                    hoverText: this.bots[bot].ip + ":" + this.bots[bot].port,
                 /*   hover: {
                        text: this.bots[bot].ip + ":" + this.bots[bot].port,
                        bg: this.gui.backgroundColor
                    },*/
                    tags: true
                });
                this.gui.playerList.append(box);
                box.pushLine(this.bots[bot].bot._client.username);
                box.on("click", () => {
                    if(!this.bots[bot]) return this.refreshBotBoxes();
                    if(!this.bots[bot].bot) return this.refreshBotBoxes();
                    if(!this.bots[bot].bot._client) return this.refreshBotBoxes();
                    this.bots[bot].selected = !this.bots[bot].selected;
                    this.refreshBotBoxes();
                });
                this.bots[bot].box = box;
                index++;
            }
        }
        //this.gui.playerList.render();
        this.gui.renderScreen();
    }

    public removeBot(bot: Bot) {
    /*    for(let bot in this.bots) {
            if(this.bots[bot].bot === bot) {
                this.bots[bot].onServer = false;
            }
        }*/

        for(let botPart = 0; botPart < this.bots.length; botPart++) {
            if(this.bots[botPart].bot === bot) {
                for(let listener of this.bots[botPart].listeners) {
                    bot.removeListener(listener.name, listener.func);
                }
                this.bots.splice(botPart, 1);
                break;
            }
        }
        bot.quit();
        this.refreshBotBoxes();

    }

    public removeListenersFromBot(bot: Bot, type?: string, key?: string) {
        for(let bP of this.bots) {
            if(bP.bot._client.username === bot._client.username) {
                for(let listnr of bP.listeners) {
                    if(type) {
                        if(listnr.name === type) {
                            if (key) {
                                if(listnr.key === key) {
                                    bot.removeListener(listnr.name, listnr.func);
                                }
                            } else {
                                bot.removeListener(listnr.name, listnr.func);
                            }
                        }
                    }else if(key) {
                        if(listnr.key === key) {
                            bot.removeListener(listnr.name, listnr.func);
                        }
                    }else {
                        bot.removeListener(listnr.name, listnr.func)
                    }
                }
                break;
            }
        }
    }


    public cutArray(array, from, to): string[] {
        let back = [];
        let index = 0;
        for(let l of array) {
            if(index >= from && index <= to) {
                back.push(l);
            }
            index++;
        }
        return back;
    }

    public stringifyArray(array, from, to, split) {
        let back = "";
        let index = 0;
        for(let l of array) {
            if(index >= from && index <= to) {
                if (index === from) {
                    back = back + l;
                } else {
                    back = back + split + l;
                }
            }
            index++;
        }
        return back;
    }

    public sendUsage(usage): void {
        this.log("Usage: " + usage, "USAGE");
    }

}

