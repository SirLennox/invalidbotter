import * as blessed from "blessed";
import {Widgets} from "blessed";
import InvalidBotter from "../invalidbotter";
import * as clipboardy from "clipboardy";
import {Bot} from "mineflayer";
export default class Gui {

    constructor(invalidbotter: InvalidBotter) {
        this.invalidbotter = invalidbotter;
    }

    public invalidbotter: InvalidBotter;

    public backgroundColor: string = "#000000";
    public chatBackground: string = "#1d1d1d";
    public inputBoxBackground: string = "#2d2d2d";
    public fontColor: string = "#ffffff";

    public borderBackground: number = 0;
    public borderColor: number = 1;
    public inputBoxLeft: any = "15%";
    public inputBoxWidth: any = "98%";
    public inputBoxHeight: any = 1;
    public inputBoxTop: any = "100%-2";

    public chatBoxLeft: any = "15%";
    public chatBoxWidth: any = "70%";
    public chatBoxHeight: any = "95%";
    public chatBoxTop: any = "0%";

    public playerListBoxLeft: any = "0%";
    public playerListBoxWidth: any = "15%";
    public playerListBoxHeight: any = "100%";
    public playerListBoxTop: any = "0%";


    public commandHistory: string[] = [];
    public commandHistoryIndex: number = 0;

    public shownBots: any[] = [];

   /* public playerListBox: Widgets.BoxElement = this.createPlayerListBox();

    public createPlayerListBox(): Widgets.BoxElement {
        return blessed.box({
            top: "0%",
            left: "0%",
            width: "15%",
            height: "100%",
            style: {
                fg: this.fontColor,
                bg: this.chatBackground,
            },
            scrollable: true,
            tags: true
        });
    }*/

    public screen: Widgets.Screen = blessed.screen({
        smartCSR: true,
        fullUnicode: true
    });

    public playerList: Widgets.BoxElement = blessed.box({
        left: this.playerListBoxLeft,
        top: this.playerListBoxTop,
        width: this.playerListBoxWidth,
        height: this.playerListBoxHeight,
        style: {
            bg: this.backgroundColor,
            fg: this.fontColor
        },
        border: {
          type: "line",
          fg: this.borderColor,
          bg: this.borderBackground
        },
        focusable: false,
        draggable: true
    });

    public background: Widgets.BoxElement = blessed.box({
        top: "0%",
        left: "0%",
        width: "100%",
        height: "100%",
        style: {
            fg: this.fontColor,
            bg: this.backgroundColor
        },
        focusable: false
    });

    public inputBox: Widgets.TextboxElement = blessed.textbox({
        top: this.inputBoxTop,
        left: this.inputBoxLeft,
        width: this.inputBoxWidth,
        height: this.inputBoxHeight,
        style: {
            fg: this.fontColor,
            bg: this.inputBoxBackground
        },
        inputOnFocus: true,
        focusable: true,
        draggable: true,
        input: true
    });

    public chatBox: Widgets.BoxElement = blessed.box({
        top: this.chatBoxTop,
        left: this.chatBoxLeft,
        width: this.chatBoxWidth,
        height: this.chatBoxHeight,
        style: {
            fg: this.fontColor,
            bg: this.chatBackground,
        },
        scrollable: true,
        focusable: false,
        tags: true,
        draggable: true,
        mouse: true
    });


    public createGui() {
        this.addComponents();
       // this.refreshPlayerList();
        this.renderScreen();
        this.inputBox.focus();
        this.addListeners();
    }

    public addComponents() {
        this.screen.append(this.background);
        this.screen.append(this.inputBox);
        this.screen.append(this.chatBox);
        this.screen.append(this.playerList);
        //  this.screen.append(this.playerListBox);
    }

    public tabText: string = undefined;
    public tabCount: number = 0;

    public addListeners() {
        this.inputBox.key('enter', () => {
           this.invalidbotter.onCommand(this.inputBox.getValue());
           this.commandHistory.push(this.inputBox.getValue());
           this.commandHistoryIndex = this.commandHistory.length;
            this.inputBox.focus();
            this.inputBox.setValue("");
            this.renderScreen();
        });
        this.inputBox.key('C-c', () => {
           process.exit(0);
        });
        this.inputBox.key("C-v", () => {
            if(this.inputBox.getValue()) {
                this.inputBox.setValue(this.inputBox.getValue() + clipboardy.readSync());
            }else {
                this.inputBox.setValue(clipboardy.readSync());
            }
            this.inputBox.focus();
            this.renderScreen();
        });
        this.inputBox.key('delete', () => {
            this.inputBox.setValue("");
            this.commandHistoryIndex = this.commandHistory.length;
            this.inputBox.focus();
            this.renderScreen();
        });

        this.inputBox.key('down', () => {
            if(this.commandHistoryIndex < this.commandHistory.length) {
                this.commandHistoryIndex++;
                if(this.commandHistoryIndex == this.commandHistory.length) {
                    this.inputBox.setValue("");
                }else {
                    this.inputBox.setValue(this.commandHistory[this.commandHistoryIndex]);
                }
                this.renderScreen();
            }
        });

        this.inputBox.key('up', () => {
            if(this.commandHistoryIndex > 0) {
                this.commandHistoryIndex--;
                this.inputBox.setValue(this.commandHistory[this.commandHistoryIndex]);
                this.renderScreen();
            }
        });

        /*this.inputBox.key('tab', () => {
            let text = this.inputBox.getValue().replace('\t', '');
            let isCommand = !text.includes(" ");
            if(this.tabText === text) {
                let commands = [];
                for (let command of this.invalidbotter.commandLoader.commands) {
                    if (command.command.toUpperCase().startsWith(text.toUpperCase())) {
                        commands.push(command.command);
                    } else {
                        for (let alias of command.aliases) {
                            if (alias.toUpperCase().startsWith(text.toUpperCase())) {
                                commands.push(command.command);
                            }
                        }
                    }
                }

                this.invalidbotter.writeInChatBox("" + commands.length);
                if(commands.length > this.tabCount) {
                    this.tabCount++;
                    this.invalidbotter.writeInChatBox("Tabbing...");
                    text = commands[this.tabCount];
                }else {
                    this.invalidbotter.writeInChatBox("Set to 0...");
                    this.tabCount = 0;
                }
            }else {
                this.tabText = undefined;
                if (isCommand) {
                    for (let command of this.invalidbotter.commandLoader.commands) {
                        if (command.command.toUpperCase().startsWith(text.toUpperCase())) {
                            text = command.command;
                            this.tabText = text;
                            this.tabCount = 0;
                            break;
                        } else {
                            for (let alias of command.aliases) {
                                if (alias.toUpperCase().startsWith(text.toUpperCase())) {
                                    text = command.command;
                                    this.tabText = text;
                                    this.tabCount = 0;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            this.inputBox.setValue(text.replace("\t", ""));
            this.renderScreen();
        });

    */}

    /*public refreshPlayerList() {
        this.playerListBox = this.createPlayerListBox();
        let index = 0;
        for(let b of this.shownBots) {
            let box;
            this.playerListBox.append(box = blessed.box({
                top: index,
                left: "0%",
                width: "15%",
                height: 1,
                style: {
                    fg: b.selected ? this.chatBackground : this.fontColor,
                    bg: !b.selected ? this.chatBackground : this.fontColor,
                },
                scrollable: true,
                tags: true
            }));
            box.pushLine(b.bot._client.username);
            box.on('click', () => {
               b.selected = !b.selected;
            });
            index++;
        }

        this.renderScreen();
    }*/

    
    public renderScreen() {
        this.screen.render();
        this.playerList.render();
    }

    public updateComponents() {
        this.inputBox.style.fg = this.fontColor;
        this.inputBox.style.bg = this.inputBoxBackground;
        this.background.style.bg = this.backgroundColor;
        this.background.style.fg = this.fontColor;
        this.chatBox.style.fg = this.fontColor;
        this.chatBox.style.bg = this.chatBackground;
        this.playerList.style.fg = this.fontColor;
        this.playerList.style.bg = this.backgroundColor
        this.playerList.left = this.playerListBoxLeft;
        this.playerList.top = this.playerListBoxTop;
        this.playerList.width = this.playerListBoxWidth;
        this.playerList.height = this.playerListBoxHeight;
        this.playerList.border.fg = this.borderColor;
        this.playerList.border.bg = this.borderBackground;
        this.inputBox.top = this.inputBoxTop;
        this.inputBox.left = this.inputBoxLeft;
        this.inputBox.width = this.inputBoxWidth;
        this.inputBox.height = this.inputBoxHeight;
        this.chatBox.top = this.chatBoxTop;
        this.chatBox.left = this.chatBoxLeft;
        this.chatBox.width = this.chatBoxWidth;
        this.chatBox.height = this.chatBoxHeight;

    }

}