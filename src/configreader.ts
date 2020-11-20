import * as fs from "fs";



export default class ConfigReader {
    public readConfigFile(file: string) {
        return JSON.parse(fs.readFileSync(file).toString());
    }
}

