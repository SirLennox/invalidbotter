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

    public background: Widgets.BoxElement = blessed.box({
        top: "0%",
        left: "0%",
        width: "100%",
        height: "100%",
        style: {
            fg: this.fontColor,
            bg: this.backgroundColor
        }
    });

    public inputBox: Widgets.TextboxElement = blessed.textbox({
        top: "95%",
        left: "15%",
        width: "98%",
        height: "5%",
        style: {
            fg: this.fontColor,
            bg: this.inputBoxBackground
        },
        inputOnFocus: true
    });

    public chatBox: Widgets.BoxElement = blessed.box({
        top: "0%",
        left: "15%",
        width: "98%",
        height: "95%",
        style: {
            fg: this.fontColor,
            bg: this.chatBackground,
        },
        scrollable: true,
        tags: true
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
        //  this.screen.append(this.playerListBox);
    }

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

    }

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
    }

    public updateComponents() {
        this.inputBox.style.fg = this.fontColor;
        this.inputBox.style.bg = this.inputBoxBackground;
        this.background.style.bg = this.backgroundColor;
        this.background.style.fg = this.fontColor;
         this.chatBox.style.fg = this.fontColor;
        this.chatBox.style.bg = this.backgroundColor;
    }

}