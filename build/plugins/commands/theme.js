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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = void 0;
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
exports.Theme = {
    aliases: [],
    author: "SirLennox",
    command: "theme",
    description: "Select a theme",
    version: "1.0",
    onCommand(args, invalidbotter) {
        let files = fs_1.default.readdirSync(path.join(__dirname, "..", "..", "themes"));
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
        try {
            invalidbotter.themeManager.selectTheme(path.join(__dirname, "..", "..", "themes", file));
            invalidbotter.log("Selected theme: " + file, "SUCCESS");
        }
        catch (e) {
            invalidbotter.log("An error occurred while selecting theme!", "ERROR");
        }
    }
};
