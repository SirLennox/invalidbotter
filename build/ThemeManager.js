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
const fs = __importStar(require("fs"));
class ThemeManager {
    constructor(invalidbotter) {
        this.invalidbotter = invalidbotter;
    }
    selectTheme(path) {
        this.invalidbotter.theme = JSON.parse(fs.readFileSync(path).toString());
        this.invalidbotter.gui.backgroundColor = this.checkNoNull(this.getKeyOfCurrTheme("backgroundColor"));
        this.invalidbotter.gui.chatBackground = this.checkNoNull(this.getKeyOfCurrTheme("chatBackground"));
        this.invalidbotter.gui.inputBoxBackground = this.checkNoNull(this.getKeyOfCurrTheme("inputBoxBackground"));
        this.invalidbotter.gui.fontColor = this.checkNoNull(this.getKeyOfCurrTheme("fontColor"));
        if (this.getKeyOfCurrTheme("inputBoxLeft"))
            this.invalidbotter.gui.inputBoxLeft = this.checkNoNull(this.getKeyOfCurrTheme("inputBoxLeft"));
        if (this.getKeyOfCurrTheme("inputBoxTop"))
            this.invalidbotter.gui.inputBoxTop = this.checkNoNull(this.getKeyOfCurrTheme("inputBoxTop"));
        if (this.getKeyOfCurrTheme("inputBoxWidth"))
            this.invalidbotter.gui.inputBoxWidth = this.getKeyOfCurrTheme("inputBoxWidth");
        if (this.getKeyOfCurrTheme("inputBoxHeight"))
            this.invalidbotter.gui.inputBoxHeight = (this.getKeyOfCurrTheme("inputBoxHeight"));
        if (this.getKeyOfCurrTheme("chatBoxTop"))
            this.invalidbotter.gui.chatBoxTop = (this.getKeyOfCurrTheme("chatBoxTop"));
        if (this.getKeyOfCurrTheme("chatBoxLeft"))
            this.invalidbotter.gui.chatBoxLeft = (this.getKeyOfCurrTheme("chatBoxLeft"));
        if (this.getKeyOfCurrTheme("chatBoxHeight"))
            this.invalidbotter.gui.chatBoxHeight = (this.getKeyOfCurrTheme("chatBoxHeight"));
        if (this.getKeyOfCurrTheme("chatBoxWidth"))
            this.invalidbotter.gui.chatBoxWidth = (this.getKeyOfCurrTheme("chatBoxWidth"));
        if (this.getKeyOfCurrTheme("playerListTop"))
            this.invalidbotter.gui.playerListBoxTop = (this.getKeyOfCurrTheme("playerListTop"));
        if (this.getKeyOfCurrTheme("playerListLeft"))
            this.invalidbotter.gui.playerListBoxLeft = (this.getKeyOfCurrTheme("playerListLeft"));
        if (this.getKeyOfCurrTheme("playerListWidth"))
            this.invalidbotter.gui.playerListBoxWidth = (this.getKeyOfCurrTheme("playerListWidth"));
        if (this.getKeyOfCurrTheme("playerListTop"))
            this.invalidbotter.gui.playerListBoxTop = (this.getKeyOfCurrTheme("playerListTop"));
        this.invalidbotter.gui.borderBackground = this.checkNoNull(this.getKeyOfCurrTheme("borderBackground"));
        this.invalidbotter.gui.borderColor = this.checkNoNull(this.getKeyOfCurrTheme("borderColor"));
        this.invalidbotter.gui.updateComponents();
        this.invalidbotter.gui.renderScreen();
        if (this.invalidbotter.theme.textColors) {
            this.invalidbotter.messageColors.colors = this.invalidbotter.theme.textColors;
        }
        return true;
    }
    checkNoNull(obj) {
        return obj ? obj : "#000000";
    }
    getKeyOfCurrTheme(key) {
        if (!this.invalidbotter.theme) {
            return;
        }
        if (!this.invalidbotter.theme.keys) {
            return;
        }
        for (let key2 of this.invalidbotter.theme.keys) {
            if (key2.key && key2.value) {
                if (key2.key.toString().toUpperCase() === key.toUpperCase()) {
                    return key2.value;
                }
            }
        }
    }
}
exports.default = ThemeManager;
