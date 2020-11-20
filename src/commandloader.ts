import Command from "./Command";

import * as fs from "fs";
import InvalidBotter from "./invalidbotter";
import {eventNames} from "cluster";

export default class CommandLoader {
    public commands: Command[];

    constructor(invalidbotter: InvalidBotter) {
    }

    public loadCommand(name: string): Command {
        for(let cmd of this.commands) {
            if(cmd.command) {
                if(cmd.command.toUpperCase() === name.toUpperCase() || cmd.aliases.includes(name)) {
                    return cmd;
                }else {
                    for(let alias of cmd.aliases) {
                        if(alias.toUpperCase() === name.toUpperCase()) {
                            return cmd;
                        }
                    }
                }
            }
        }
        return null;
    }

    public refreshCommands() {
        this.commands = [];
        let files: string[] = fs.readdirSync("./build/plugins/commands");
        for(let file of files) {
            if(file.endsWith(".js")) {
                let command = require("../build/plugins/commands/" + file);
                this.commands.push(command[Object.keys(command)[0]]);
            }
        }
    }




}