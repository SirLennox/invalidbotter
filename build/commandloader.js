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
class CommandLoader {
    constructor(invalidbotter) {
    }
    loadCommand(name) {
        for (let cmd of this.commands) {
            if (cmd.command) {
                if (cmd.command.toUpperCase() === name.toUpperCase() || cmd.aliases.includes(name)) {
                    return cmd;
                }
                else {
                    for (let alias of cmd.aliases) {
                        if (alias.toUpperCase() === name.toUpperCase()) {
                            return cmd;
                        }
                    }
                }
            }
        }
        return null;
    }
    refreshCommands() {
        this.commands = [];
        let files = fs.readdirSync("./build/plugins/commands");
        for (let file of files) {
            if (file.endsWith(".js")) {
                let command = require("../build/plugins/commands/" + file);
                this.commands.push(command[Object.keys(command)[0]]);
            }
        }
    }
}
exports.default = CommandLoader;
