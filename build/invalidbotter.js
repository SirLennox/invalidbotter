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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mineflayer = __importStar(require("mineflayer"));
const configreader_1 = __importDefault(require("./configreader"));
const moduleloader_1 = __importDefault(require("./moduleloader"));
const commandloader_1 = __importDefault(require("./commandloader"));
const gui_1 = __importDefault(require("./gui/gui"));
const ThemeManager_1 = __importDefault(require("./ThemeManager"));
class InvalidBotter {
    //TODO ADD THEMES WITH COLORS ETC
    constructor() {
        this.bots = [];
        this.botDelayIndex = -1;
        this.themeManager = new ThemeManager_1.default(this);
        this.configReader = new configreader_1.default();
        this.config = this.configReader.readConfigFile("./settings.json");
        this.messageColors = this.configReader.readConfigFile("./defaultMessageColors.json");
        this.gui = new gui_1.default(this);
        this.commandLoader = new commandloader_1.default(this);
        this.moduleLoader = new moduleloader_1.default(this);
    }
    start() {
        this.gui.createGui();
        console.log = (input) => this.log(input, "INFO");
        console.info = (input) => this.log(input, "INFO");
        console.error = (input) => this.log(input, "ERROR");
        console.warn = (input) => this.log(input, "WARN");
        // this.themeManager.selectTheme("./themes/dark.json");
        this.commandLoader.refreshCommands();
        this.moduleLoader.reloadModules();
        for (let module of this.moduleLoader.modules) {
            if (module.toggled) {
                module.onEnable(this);
                module.loop = setInterval(() => {
                    module.onUpdate(this);
                }, 1000 / module.loopInterval);
            }
        }
        //   this.themeManager.selectTheme("./src/themes/dark.json");
    }
    onCommand(command) {
        let splitCommand = command.split(" ");
        if (splitCommand.length >= 1) {
            let commandStr = splitCommand[0];
            let args = this.cutArray(splitCommand, 1, splitCommand.length);
            let command = this.commandLoader.loadCommand(commandStr);
            if (!command) {
                this.log("Unknown command! Type {bold}'help'{/bold} for help.", "ERROR");
                return;
            }
            command.onCommand(args, this);
        }
    }
    log(text, loglevel, bot) {
        this.writeInChatBox("[{" + this.getColorOf(loglevel) + "-fg}" + loglevel + "{/}" + (bot ? "/" + bot._client.username : "") + "] " + text);
    }
    writeInChatBox(text) {
        if (!this.gui)
            return;
        if (!this.gui.chatBox)
            return;
        this.gui.chatBox.pushLine(text.toString());
        this.gui.chatBox.setScrollPerc(100);
        this.gui.renderScreen();
    }
    getBotByName(name) {
        for (let bot of this.getBotsOnServer()) {
            if (bot._client.username.toUpperCase() === name.toUpperCase()) {
                return bot;
            }
        }
    }
    getColorOf(loglevel) {
        for (let text of this.messageColors.colors) {
            if (text.name.toString().toUpperCase() === loglevel.toUpperCase()) {
                return text.color;
            }
        }
        return "#FFFFFF";
    }
    addBotWithDelay(options, sendMessage) {
        if (!sendMessage) {
            sendMessage = false;
        }
        this.botDelayIndex++;
        setTimeout(() => {
            let bot = this.addBot(options);
            if (sendMessage)
                this.log("Joined server {bold}" + options.host + ":" + options.port + "{/bold} with account: {bold}" + options.username + "{/bold}", "SUCCESS");
            this.botDelayIndex--;
        }, this.getBotDelay());
    }
    getBotDelay() {
        return this.config.joinDelay + (this.botDelayIndex * this.config.joinDelay);
    }
    addBot(options) {
        let bot = mineflayer.createBot(options);
        this.bots.push({
            bot: bot,
            listeners: [],
            onServer: false,
            ip: options.host,
            port: options.port
        });
        this.addListenerToBot(bot, "spawn", () => {
            for (let module of this.moduleLoader.modules) {
                if (module.toggled) {
                    module.onBotSpawn(bot, this);
                }
            }
            for (let b in this.bots) {
                if (this.bots[b].bot === bot) {
                    this.bots[b].onServer = true;
                    break;
                }
            }
        });
        this.addListenerToBot(bot, "kicked", (reason, loggedIn) => {
            this.removeBot(bot);
            for (let module of this.moduleLoader.modules) {
                if (module.toggled) {
                    module.onBotKick(bot, this, reason, loggedIn);
                }
            }
        });
        /* this.gui.shownBots.push({
             bot: bot,
             selected: false,
             box: undefined
         })*/
        //this.gui.refreshPlayerList();
        return bot;
    }
    getAllBots() {
        let array = [];
        for (let bot of this.bots) {
            array.push(bot.bot);
        }
        return array;
    }
    getBotsOnServer() {
        let array = [];
        for (let bot of this.bots) {
            if (bot.onServer) {
                array.push(bot.bot);
            }
        }
        return array;
    }
    getSelectedBots() {
        let array = [];
        for (let bot of this.bots) {
            if (bot.onServer) {
                array.push(bot.bot);
            }
        }
        return array;
    }
    addListenerToBot(bot, listenerType, func, key) {
        bot.on(listenerType, func);
        for (let botPart in this.bots) {
            if (this.bots[botPart].bot === bot) {
                this.bots[botPart].listeners.push({ name: listenerType, func: func, key: key });
                break;
            }
        }
    }
    removeBot(bot) {
        for (let slct = 0; slct < this.gui.shownBots.length; slct++) {
            if (this.gui.shownBots[slct].bot === bot) {
                this.gui.shownBots.splice(slct, 1);
                break;
            }
        }
        for (let botPart = 0; botPart < this.bots.length; botPart++) {
            if (this.bots[botPart].bot === bot) {
                for (let listener of this.bots[botPart].listeners) {
                    bot.removeListener(listener.name, listener.func);
                }
                this.bots.splice(botPart, 1);
                break;
            }
        }
        bot.quit();
        //this.gui.refreshPlayerList();
    }
    removeListenersFromBot(bot, type, key) {
        for (let bP of this.bots) {
            if (bP.bot._client.username === bot._client.username) {
                for (let listnr of bP.listeners) {
                    if (type) {
                        if (listnr.name === type) {
                            if (key) {
                                if (listnr.key === key) {
                                    bot.removeListener(listnr.name, listnr.func);
                                }
                            }
                            else {
                                bot.removeListener(listnr.name, listnr.func);
                            }
                        }
                    }
                    else if (key) {
                        if (listnr.key === key) {
                            bot.removeListener(listnr.name, listnr.func);
                        }
                    }
                    else {
                        bot.removeListener(listnr.name, listnr.func);
                    }
                }
                break;
            }
        }
    }
    cutArray(array, from, to) {
        let back = [];
        let index = 0;
        for (let l of array) {
            if (index >= from && index <= to) {
                back.push(l);
            }
            index++;
        }
        return back;
    }
    stringifyArray(array, from, to, split) {
        let back = "";
        let index = 0;
        for (let l of array) {
            if (index >= from && index <= to) {
                if (index === from) {
                    back = back + l;
                }
                else {
                    back = back + split + l;
                }
            }
            index++;
        }
        return back;
    }
    sendUsage(usage) {
        this.log("Usage: " + usage, "USAGE");
    }
}
exports.default = InvalidBotter;
