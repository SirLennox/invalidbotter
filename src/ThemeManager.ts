import InvalidBotter from "./invalidbotter";
import * as fs from "fs";


export default class ThemeManager {

    public invalidbotter: InvalidBotter;

    constructor(invalidbotter) {
        this.invalidbotter = invalidbotter;
    }

    public selectTheme(path: string): boolean {
        this.invalidbotter.theme = JSON.parse(fs.readFileSync(path).toString());

            this.invalidbotter.gui.backgroundColor = this.checkNoNull(this.getKeyOfCurrTheme("backgroundColor"));
            this.invalidbotter.gui.chatBackground = this.checkNoNull(this.getKeyOfCurrTheme("chatBackground"));
            this.invalidbotter.gui.inputBoxBackground = this.checkNoNull(this.getKeyOfCurrTheme("inputBoxBackground"));
            this.invalidbotter.gui.fontColor  = this.checkNoNull(this.getKeyOfCurrTheme("fontColor"));
            this.invalidbotter.gui.updateComponents();
           this.invalidbotter.gui.renderScreen();
           if(this.invalidbotter.theme.textColors) {
               this.invalidbotter.messageColors.colors = this.invalidbotter.theme.textColors;
           }
        return true;
    }

    public checkNoNull(obj) {
        return obj ? obj : "#000000";
    }

    public getKeyOfCurrTheme(key: string): string {
        if(!this.invalidbotter.theme) {
            return;
        }
        if(!this.invalidbotter.theme.keys) {
            return;
        }
        for(let key2 of this.invalidbotter.theme.keys) {
            if(key2.key && key2.value) {
                if (key2.key.toString().toUpperCase() === key.toUpperCase()) {
                    return key2.value;
                }
            }
        }
    }
}