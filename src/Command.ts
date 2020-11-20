import InvalidBotter from "./invalidbotter";

export default class Command {
    public command: string;
    public author: string;
    public version: string;
    public description: string;
    public aliases: string[];

    constructor(command: string, description: string, author: string, version: string) {
        this.command = name;
        this.author = author;
        this.version = version;
        this.description = description;
    }

    public onCommand(args: string[], invalidbotter: InvalidBotter): void { }

}