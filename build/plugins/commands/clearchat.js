"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backward = void 0;
exports.Backward = {
    aliases: [],
    author: "SirLennox",
    command: "clearchat",
    description: "Clear the chat",
    version: "1.0",
    onCommand(args, invalidbotter) {
        invalidbotter.gui.chatBox.setContent("");
    }
};
