"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Themes = void 0;
const fs_1 = __importDefault(require("fs"));
exports.Themes = {
    aliases: [],
    author: "SirLennox",
    command: "themes",
    description: "List all themes",
    version: "1.0",
    onCommand(args, invalidbotter) {
        let files = fs_1.default.readdirSync("./themes");
        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Help-Page{/}]-----------");
        for (let file of files) {
            invalidbotter.writeInChatBox(file.replace(".json", ""));
        }
        invalidbotter.writeInChatBox("-----------[{#00FF1C-fg}Help-Page{/}]-----------");
    }
};
