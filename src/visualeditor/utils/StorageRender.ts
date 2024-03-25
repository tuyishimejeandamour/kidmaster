import { ipcRenderer } from 'electron';

type StateData = Record<string, any>;

export class RenderStorage {
    private states: Record<string, StateData> = {};

    public getState(key: string): StateData | undefined {
        if (!this.states[key]) {
            this.requestState(key);
        }
        return this.states[key];
    }

    public setState(key: string, data: StateData): void {
        this.states[key] = data;
        ipcRenderer.send('update-state', key, data);
    }

    public onStateUpdate(callback: Function): void {
        ipcRenderer.on('state-updated', (event, key, data) => {
            this.states[key] = data;
            callback(key, data);
        });
    }

    private requestState(key: string): void {
        ipcRenderer.send('get-state', key);
    }
}
