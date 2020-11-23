import Module from "./Module";
import fs from "fs";
import InvalidBotter from "./invalidbotter";
import path from "path";

export default class ModuleLoader {
    public modules: Module[];

    public pathToModules;
    public invalidbotter: InvalidBotter;
    constructor(invalidbotter: InvalidBotter, pathToModules) {
        this.invalidbotter = invalidbotter;
        this.pathToModules = pathToModules;
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
        let files: string[] = fs.readdirSync(this.pathToModules);
        for(let file of files) {
            if(file.endsWith(".js")) {
                let module = require( path.join(__dirname, "plugins", "modules", file));
                let keys = Object.keys(module);
                for(let index = 0; index < keys.length; index++) {
                    this.modules.push(module[keys[index]]);
                }
            }
        }
    }




}