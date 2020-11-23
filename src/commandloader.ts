import Command from "./Command";

import * as path from "path";
import * as fs from "fs";
import InvalidBotter from "./invalidbotter";
import {eventNames} from "cluster";

export default class CommandLoader {
    public commands: Command[];

    public pathToCommands;

    constructor(invalidbotter: InvalidBotter, pathToCommands) {
        this.pathToCommands = pathToCommands;
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
        let files: string[] = fs.readdirSync(this.pathToCommands);
        for(let file of files) {
            if(file.endsWith(".js")) {

                let command = require( path.join(__dirname, "plugins", "commands", file));
                let keys = Object.keys(command);
                for(let index = 0; index < keys.length; index++) {
                    this.commands.push(command[keys[index]]);
                }

            }
        }
    }




}