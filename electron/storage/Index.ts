import * as fs from 'fs';
import { ipcMain, ipcRenderer, app } from 'electron';
import { encrypt, decrypt } from './crypto';
import path from "node:path";

type StateData = Record<string, any>;

interface StorageOptions {
    fileName?: string;
    encryption?: boolean;
    states: Record<string, StateData>;
}

export class ChimeStorage {
    private readonly dataPath: string;
    private readonly encryption: boolean;
    private key?: string;
    private states: Record<string, StateData> = {};

    constructor({ fileName = 'data', encryption = false, states }: StorageOptions) {
        this.dataPath = path.join(app.getPath('userData'), fileName ? `${fileName}.json` : 'data.json');
        this.encryption = encryption;
        this.key = undefined;
        this.states = {};

        if (states) {
            Object.entries(states).forEach(([key, state]) => {
                if (typeof state !== 'object') {
                    throw new Error(`Invalid state: "${key}"`);
                }
                this.states[key] = state;
            });
        }

    }

    public init(key?: string): void {
        this.key = key;

            ipcMain.on('update-state', (event, key, data) => {
                this.updateStateFromRenderer(key, data);
            });

            ipcMain.on('pathAndKey', (event, arg) => {
                event.returnValue = { appPath: app.getPath('userData'), key: this.key };
            });

    }

    public get savedData(): Record<string, any> {
        try {
            const data = JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
            if (this.encryption) {
                return JSON.parse(decrypt(data, this.key!));
            }
            return data;
        } catch (error) {
            return {};
        }
    }

    public set savedData(data: Record<string, any>) {
        if (this.encryption) {
            data = encrypt(JSON.stringify(data), this.key!);
        }
        fs.writeFileSync(this.dataPath, JSON.stringify(data), 'utf8');
    }

    public getState(key: string): StateData | undefined {
        return this.states[key];
    }

    public setState(key: string, data: StateData): void {
        if (typeof data !== 'object') {
            throw new Error(`Invalid state: "${key}"`);
        }
        this.states[key] = data;
        this.saveChanges();

    }

    public getStates(): Record<string, StateData> {
        return this.states;
    }

    public setStates(states: Record<string, StateData>): void {
        Object.entries(states).forEach(([key, state]) => {
            if (typeof state !== 'object') {
                throw new Error(`Invalid state: "${key}"`);
            }
        });
        this.states = states;
        this.saveChanges();

        if (process.type === 'renderer') {
            ipcRenderer.send('update-state', Object.keys(states), this.states);
        }
    }

    private saveChanges(): void {

        this.savedData = {
            ...this.savedData,
            ...this.states,
        };

    }

    private updateStateFromRenderer(key: string, data: StateData): void {
        if (typeof data !== 'object') {
            throw new Error(`Invalid state: "${key}"`);
        }
        this.states[key] = data;
        this.saveChanges();
    }
}
