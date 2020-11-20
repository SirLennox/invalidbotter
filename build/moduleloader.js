"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class ModuleLoader {
    constructor(invalidbotter) {
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
        let files = fs_1.default.readdirSync("./build/plugins/modules");
        for (let file of files) {
            if (file.endsWith(".js")) {
                let module = require("../build/plugins/modules/" + file);
                this.modules.push(module[Object.keys(module)[0]]);
            }
        }
    }
}
exports.default = ModuleLoader;
