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
exports.AutoRefresh = void 0;
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
let commandWatch = undefined;
let moduleWatch = undefined;
let themeWatch = undefined;
exports.AutoRefresh = {
    onBotSpawn(bot, botter) { },
    author: "SirLennox",
    description: "Auto-Refresh plugins, commands & themes",
    loop: undefined,
    loopInterval: -1,
    name: "AutoRefresh",
    toggled: true,
    version: "1.0",
    onDisable(botter) {
        fs_1.default.unwatchFile(path.join(__dirname, "../commands/"), commandWatch);
        fs_1.default.unwatchFile(__dirname, moduleWatch);
    },
    onEnable(botter) {
        commandWatch = fs_1.default.watch(path.join(__dirname, "../commands/"), (event, filename) => {
            botter.commandLoader.refreshCommands();
        });
        moduleWatch = fs_1.default.watch(__dirname, (event, filename) => {
            botter.moduleLoader.reloadModules();
        });
    },
    onUpdate(botter) {
    },
    onBotKick(bot, botter, reason, loggedIn) {
    }
};
