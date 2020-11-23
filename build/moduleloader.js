"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ModuleLoader {
    constructor(invalidbotter, pathToModules) {
        this.invalidbotter = invalidbotter;
        this.pathToModules = pathToModules;
    }
    loadModule(name) {
        for (let module of this.modules) {
            if (module.name.toUpperCase() === name.toUpperCase()) {
                return module;
            }
        }
        return null;
    }
    reloadModules() {
        this.modules = [];
        let files = fs_1.default.readdirSync(this.pathToModules);
        for (let file of files) {
            if (file.endsWith(".js")) {
                let module = require(path_1.default.join(__dirname, "plugins", "modules", file));
                let keys = Object.keys(module);
                for (let index = 0; index < keys.length; index++) {
                    this.modules.push(module[keys[index]]);
                }
            }
        }
    }
}
exports.default = ModuleLoader;
