"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = void 0;
const fs_1 = __importDefault(require("fs"));
exports.Theme = {
    aliases: [],
    author: "SirLennox",
    command: "theme",
    description: "Select a theme",
    version: "1.0",
    onCommand(args, invalidbotter) {
        let files = fs_1.default.readdirSync("./themes");
        let file = undefined;
        if (files.includes(args[0])) {
            file = args[0];
        }
        else if (files.includes(args[0] + ".json")) {
            file = args[0] + ".json";
        }
        if (!file) {
            console.error("Theme not found! Please check your spelling and capitalization.");
            return;
        }
        invalidbotter.themeManager.selectTheme("./themes/" + file);
        invalidbotter.log("Selected theme: " + file, "SUCCESS");
    }
};
