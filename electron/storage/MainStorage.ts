import * as fs from 'fs';
import { ipcMain } from 'electron';
import path from 'node:path';

interface StateOptions {
    path?: string;
    cypher?: boolean;
    chime?: boolean;
    project?: boolean;
}

interface InputData {
    options: StateOptions;
    data: Record<string, any>;
}

type StateData = Record<string, any>;

interface StorageOptions {
    dataPath: string;
}

export class MainStorage {
    private readonly dataPath: string;
    private states: Record<string, StateData> = {};

    constructor({ dataPath }: StorageOptions) {
        this.dataPath = dataPath + `/` + 'localData';
        if (!fs.existsSync(this.dataPath)) {
            fs.mkdirSync(this.dataPath);
        }
        if (!fs.existsSync(this.dataPath + `/` + 'chime')) {
            fs.mkdirSync(this.dataPath + `/` + 'chime');
        }

        ipcMain.handle('get-state', async (event, key, directory) => {
            return this.readState(key, directory);
        });

        ipcMain.handle('update-state', async (event, key, data) => {
            this.writeState(key, data);
            this.sendStateToAllRenderers(key, data.data);
            return true;
        });

        ipcMain.handle('save-appState', async (event, key, data) => {
            this.writeState(key, data);
            this.sendStateToAllRenderers(key, data.data);
            return true;
        });

    }

    private readState(key: string, directory: string): StateData | null {
        try {
            if (!directory.includes('project')) {
                console.log('Path', path.join(this.dataPath, `${directory}/${key}.json`));
                    const data = fs.readFileSync(path.join(this.dataPath, `${directory}/${key}.json`), 'utf8');
                    return JSON.parse(data);

            }
            const data = fs.readFileSync(path.join(this.dataPath, `${key}.json`), 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.log('Error reading state', key, error);
            return [];
        }
    }

    private writeState(key: string, data: InputData): void {
        if (data.options.path) {
            let filePath = path.join(this.dataPath, data.options.path);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
            }
            fs.writeFileSync(path.join(filePath, `${key}.json`), JSON.stringify(data.data), 'utf8');
        }
        if (data.options.project) {
            let toBeSavedData = {...data.data.chime}
            let project = this.removeProperties(data.data, ['chime']);
            let fetchedProjects = this.readState('project', 'project');
            if (fetchedProjects) {
                fetchedProjects.push(project);
            } else {
                fetchedProjects = [project];
            }

            fs.writeFileSync(path.join(this.dataPath, `project.json`), JSON.stringify(fetchedProjects), 'utf8');
            let pathJoint = this.dataPath + `/` + `chime`;
            fs.writeFileSync(path.join(pathJoint, `${data.data.id}.json`), JSON.stringify(toBeSavedData), 'utf8');
        }
        if (data.options.chime) {
            let pathJoint = this.dataPath + `/` + `chime`;
            fs.writeFileSync(path.join(pathJoint, `${key}.json`), JSON.stringify(data.data), 'utf8');
        }
        this.states[key] = data.data;
    }

    private removeProperties(object: any, propertiesToRemove: string[]): object {
        for (let prop of propertiesToRemove) {
            delete object[prop];
        }
        return object;
    }

    private sendStateToAllRenderers(key: string, data: StateData): void {
        ipcMain.emit('state-updated', key, data);
    }
}