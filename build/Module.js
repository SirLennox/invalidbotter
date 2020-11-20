"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Module {
    constructor(name, description, author, version) {
        this.name = "Module name";
        this.author = "Your name";
        this.version = "1.0";
        this.description = "Some description";
        this.toggled = false;
        this.loopInterval = 20;
        this.loop = undefined;
        this.name = name;
        this.author = author;
        this.version = version;
        this.description = description;
        this.toggled = false;
    }
    onEnable(botter) { }
    onUpdate(botter) { }
    onDisable(botter) { }
    onBotSpawn(bot, botter) { }
    onBotKick(bot, botter, reason, loggedIn) {
    }
}
exports.default = Module;
