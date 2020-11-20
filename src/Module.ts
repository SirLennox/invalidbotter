import InvalidBotter from "./invalidbotter";
import {Bot} from "mineflayer";

export default class Module {
    public name: string = "Module name";
    public author: string = "Your name";
    public version: string = "1.0";
    public description: string = "Some description";
    public toggled: boolean = false;
    public loopInterval: number = 20;
    public loop: any = undefined;

    constructor(name: string, description: string, author: string, version: string) {
        this.name = name;
        this.author = author;
        this.version = version;
        this.description = description;
        this.toggled = false;
    }

    public onEnable(botter: InvalidBotter): void { }

    public onUpdate(botter: InvalidBotter): void { }

    public onDisable(botter: InvalidBotter): void { }

    public onBotSpawn(bot: Bot, botter: InvalidBotter): void {}

    public onBotKick(bot: Bot, botter: InvalidBotter, reason: string, loggedIn: boolean): void {

    }


}