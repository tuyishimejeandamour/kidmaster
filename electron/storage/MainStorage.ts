import * as fs from 'fs';
import { ipcMain } from 'electron';
import path from "node:path";

type StateData = Record<string, any>;

interface StorageOptions {
    dataPath: string;
}

export class MainStorage {
    private readonly dataPath: string;
    private states: Record<string, StateData> = {};

    constructor({ dataPath }: StorageOptions) {
        this.dataPath = dataPath;

        ipcMain.on('get-state', (event, key) => {
            event.returnValue = this.readState(key);
        });

        ipcMain.on('update-state', (event, key, data) => {
            this.writeState(key, data);
            this.sendStateToAllRenderers(key, data);
        });
    }

    private readState(key: string): StateData {
        try {
            const data = fs.readFileSync(path.join(this.dataPath, `${key}.json`), 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return {};
        }
    }

    private writeState(key: string, data: StateData): void {
        fs.writeFileSync(path.join(this.dataPath, `${key}.json`), JSON.stringify(data), 'utf8');
        this.states[key] = data;
    }

    private sendStateToAllRenderers(key: string, data: StateData): void {
        ipcMain.emit('state-updated', key, data);
    }
}
