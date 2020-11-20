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


export default class InvalidBotter {


    public config: any;
    public messageColors: any;
    public configReader: ConfigReader;
    public commandLoader: CommandLoader;
    public moduleLoader: ModuleLoader
    public gui: Gui;
    public bots: any[] = [];
    public theme: any;
    public themeManager: ThemeManager;
    //TODO ADD THEMES WITH COLORS ETC

    public constructor() {
        this.themeManager = new ThemeManager(this);
        this.configReader = new ConfigReader();
        this.config = this.configReader.readConfigFile("./settings.json");
        this.messageColors = this.configReader.readConfigFile("./defaultMessageColors.json");

        this.gui = new Gui(this);
        this.commandLoader = new CommandLoader(this);
        this.moduleLoader = new ModuleLoader(this);

    }

    public start(): void {

        this.gui.createGui();
        console.log = (input) => this.log(input, "INFO");
        console.info = (input) => this.log(input, "INFO");
        console.error = (input) => this.log(input, "ERROR");
        console.warn = (input) => this.log(input, "WARN");
       // this.themeManager.selectTheme("./themes/dark.json");
        this.commandLoader.refreshCommands();
        this.moduleLoader.reloadModules();
        for(let module of this.moduleLoader.modules) {
            if(module.toggled) {
                module.onEnable(this);
                module.loop = setInterval(() => {
                    module.onUpdate(this);
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

            command.onCommand(args, this);
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
            if(bot._client.username.toUpperCase() === name.toUpperCase() && bot.onServer) {
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
            port: options.port
        })

        this.addListenerToBot(bot, "spawn", () => {
            for(let module of this.moduleLoader.modules) {
                if(module.toggled) {
                    module.onBotSpawn(bot, this);
                }
            }
            for(let b in this.bots) {
                if(this.bots[b].bot === bot) {
                    this.bots[b].onServer = true;
                    break;
                }
            }
        });

        this.addListenerToBot(bot, "kicked", (reason, loggedIn) => {
            this.removeBot(bot);
            for(let module of this.moduleLoader.modules) {
                if(module.toggled) {
                    module.onBotKick(bot, this, reason, loggedIn);
                }
            }
        })

       /* this.gui.shownBots.push({
            bot: bot,
            selected: false,
            box: undefined
        })*/
        //this.gui.refreshPlayerList();
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
            if(bot.onServer) {
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

    public removeBot(bot: Bot) {
        for(let slct = 0; slct < this.gui.shownBots.length; slct++) {
            if(this.gui.shownBots[slct].bot === bot) {
                this.gui.shownBots.splice(slct, 1);
                break;
            }
        }
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
        //this.gui.refreshPlayerList();

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

