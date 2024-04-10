import {ipcRenderer} from 'electron';

type StateData = Record<string, any>;

interface StateOptions{
    path?:string;
    cypher?:string;
    chime?:string;
    project?:string;
}
interface InputData {
    options: StateOptions
    data: Record<string, any>;
}

class RenderStorage {
    private states: Record<string, StateData> = {};

    public async getState(key: string, destination?: string): Promise<StateData | undefined> {
        if (!this.states[key]) {
            return await this.requestState(key, destination);
        }
        return this.states[key];
    }

    public setState(key: string, data: InputData): void {
        this.states[key] = data;
        ipcRenderer.invoke('update-state', key, data).catch(console.error);
    }

    public onStateUpdate(callback: Function): void {
        ipcRenderer.on('state-updated', (event, key, data) => {
            this.states[key] = data;
            callback(key, data);
        });
    }


    private  requestState(key: string,destination?:string):Promise<StateData>  {
        return  ipcRenderer.invoke('get-state', key,destination);
    }
}

export const PersistStorage = new RenderStorage();