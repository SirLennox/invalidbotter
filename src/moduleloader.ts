import Module from "./Module";
import fs from "fs";
import InvalidBotter from "./invalidbotter";

export default class ModuleLoader {
    public modules: Module[];

    constructor(invalidbotter: InvalidBotter) {
    }


    public loadModule(name: string): Module {
        for(let module of this.modules) {
            if(module.name.toUpperCase() === name.toUpperCase()) {
                return module;
            }
        }
        return null;
    }

    public reloadModules() {
        this.modules = [];
        let files: string[] = fs.readdirSync("./build/plugins/modules");
        for(let file of files) {
            if(file.endsWith(".js")) {
                let module = require("../build/plugins/modules/" + file);
                this.modules.push(module[Object.keys(module)[0]]);
            }
        }
    }




}