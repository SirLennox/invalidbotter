import {Bot} from "mineflayer";
import {Widgets} from "blessed";
import IListener from "./IListener";

export default interface IBot {
    bot: Bot;
    listeners: IListener[];
    onServer: boolean;
    ip: string;
    port: number;
    selected: boolean;
    box: Widgets.BoxElement;
}